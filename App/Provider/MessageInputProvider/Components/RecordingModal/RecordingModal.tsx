import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { formatTimer } from '@Hooks/useTimer';
import Wave from '@Skia/Wave';
import { useColors } from '@Theme/index';
import MaskedView from '@react-native-masked-view/masked-view';
import { getBitrate } from 'Services/FFMPEG';
import { AVPlaybackStatusSuccess, Audio } from 'expo-av';
import React, { useCallback, useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { SlideInLeft, useSharedValue } from 'react-native-reanimated';
import useStyles from './styles';

export const RecordingModal: React.FC = () => {
  const colors = useColors();
  const [currentRecording, setCurrentRecording] = useState<Audio.Recording>();
  const styles = useStyles(colors);
  const [recordingStatus, setRecordingStatus] =
    useState<Audio.RecordingStatus>();
  const [wave, setWave] = useState<string>();
  const [uri, setUri] = useState<string | null>(null);
  const position = useSharedValue(0.8);
  const duration = useSharedValue(100);

  const onRecordingPressed = useCallback(async () => {
    if (currentRecording) {
      await currentRecording.stopAndUnloadAsync();
      setUri(currentRecording.getURI());
      const uri = currentRecording.getURI();
      if (typeof uri === 'string') {
        getBitrate(uri).then((image) => image && setWave(image));
      }
      duration.value = Math.floor(recordingStatus?.durationMillis || 0 / 1000);
      return setCurrentRecording(undefined);
    }
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
    });
    Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    ).then(({ recording }) => {
      setUri('');
      setWave(undefined);
      setCurrentRecording(recording);
      position.value = 0;
      recording.setProgressUpdateInterval(100);
      recording.setOnRecordingStatusUpdate((status) => {
        setRecordingStatus(status);
      });
    });
  }, [currentRecording]);

  const onPlayPressed = useCallback(async () => {
    if (uri === null) return;
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
    await sound.setProgressUpdateIntervalAsync(1);
    // @ts-ignore
    sound.setOnPlaybackStatusUpdate((event: AVPlaybackStatusSuccess) => {
      position.value =
        (event.positionMillis / (event.durationMillis || 1)) * 300;
    });
  }, [uri]);

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={onRecordingPressed} style={styles.button}>
          <Icon name={`${currentRecording ? 'square' : 'mic'}-outline`} />
        </Pressable>
        <Separator horizontal />
        {currentRecording && recordingStatus ? (
          <Text entering={SlideInLeft}>
            {formatTimer(-recordingStatus.durationMillis)}
          </Text>
        ) : null}

        {uri ? (
          <Pressable onPress={onPlayPressed} disabled={uri === null}>
            <Icon name={'play-circle-outline'} />
          </Pressable>
        ) : null}

        {uri && wave ? (
          <>
            <Separator horizontal />
            <MaskedView
              maskElement={
                <Image
                  source={{ uri: wave }}
                  resizeMode="stretch"
                  style={styles.wave}
                />
              }>
              <Wave progress={position} width={300} height={48} />
            </MaskedView>
          </>
        ) : null}
      </View>
    </>
  );
};
export default RecordingModal;
