import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { formatTimer } from '@Hooks/useTimer';
import Wave from '@Skia/Wave';
import { useColors } from '@Theme/index';
import { getBitrate } from 'Services/FFMPEG';
import { AVPlaybackStatusSuccess, Audio } from 'expo-av';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { SlideInLeft, useSharedValue } from 'react-native-reanimated';
import useStyles from './styles';
import Pulse from '@Skia/Pulse';

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
  const metring = useSharedValue(0);
  const soundInstance = useRef<Audio.Sound>();

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
        if (status.metering !== undefined) metring.value = status.metering;
        else metring.value = 0;
        setRecordingStatus(status);
      });
    });
  }, [currentRecording]);

  const onPlayPressed = useCallback(async () => {
    if (uri === null) return;
    if (soundInstance.current) {
      await soundInstance.current.stopAsync();
      await soundInstance.current.unloadAsync();
      soundInstance.current = undefined;
      position.value = 0;
      return;
    }
    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound: playObject } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      soundInstance.current = playObject;
      await playObject.setProgressUpdateIntervalAsync(1);

      playObject.setOnPlaybackStatusUpdate(
        // @ts-ignore
        (event: AVPlaybackStatusSuccess) => {
          position.value =
            (event.positionMillis / (event.durationMillis || 1)) * 300;
        }
      );
      await soundInstance.current.playAsync();
    } catch (error) {
      console.log(error);
    }
  }, [uri, soundInstance.current]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wave_container}>
          {currentRecording ? <Pulse peak={metring} /> : null}
          <Pressable onPress={onRecordingPressed} style={styles.button}>
            <Icon name={`${currentRecording ? 'square' : 'mic'}-outline`} />
          </Pressable>
        </View>

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

        {wave && uri ? (
          <Wave progress={position} width={300} height={48} uri={wave} />
        ) : null}
      </View>
    </>
  );
};
export default RecordingModal;
