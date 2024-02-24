import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useBottomSheet } from '@Context/BottomSheet';
import { useTimer } from '@Hooks/useTimer';
import { BulletinCreators } from '@Khayat/Redux/Actions/BulletinActions';
import RecordButton from '@Molecules/RecordButton';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useColors } from '@Theme/index';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Camera,
  CameraPosition,
  CameraRuntimeError,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';

import screenStyles from './MediaRecording.styles';

export const MediaRecording: React.FC = () => {
  const [cameraPosition, setPosition] = useState<CameraPosition>('front');
  const cameraDevice = useCameraDevice(cameraPosition);
  const cameraRef = useRef<Camera>(null);
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const styles = screenStyles(insets, colors);
  const [recording, setRecording] = useState<boolean>(false);
  const { start, reset, timer } = useTimer();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { requestPermission, hasPermission } = useCameraPermission();
  const dispatch = useDispatch();
  const [mediaSettings, setMediaSettings] = useState<{
    video: boolean;
    audio: boolean;
  }>({ video: true, audio: true });

  const onError = useCallback((error: CameraRuntimeError) => {
    console.log(error);
  }, []);

  const onAudioPressed = useCallback(() => {
    setMediaSettings((settings) => ({ ...settings, audio: !settings.audio }));
  }, [mediaSettings]);

  const onVideoPressed = useCallback(() => {
    setMediaSettings((settings) => ({ ...settings, video: !settings.video }));
  }, [mediaSettings]);

  const onRotateCamera = useCallback(() => {
    if (cameraPosition === 'back') {
      setPosition('front');
    } else {
      setPosition('back');
    }
  }, [cameraPosition]);

  const onRecordPressed = useCallback(() => {
    if (recording) {
      setRecording(false);
      return onStopRecordingPressed();
    }
    if (hasPermission) {
      requestPermission().then(() => {
        dispatch(BulletinCreators.stream());
        if (cameraRef.current) {
          cameraRef.current.startRecording({
            onRecordingFinished: (video) => {
              CameraRoll.save(`file://${video.path}`, {
                type: 'video',
              }).then(() => {
                showBottomSheet({
                  icon: 'checkmark-outline',
                  title: 'Bulletin Saved',
                  subtitle: 'Bulletin saved on your device successfully',
                  cta: {
                    title: 'Close',
                    color: colors.turquoise,
                    onPress: hideBottomSheet,
                  },
                });
              });
            },
            onRecordingError: (error) => {
              showBottomSheet({
                icon: 'info-outline',
                title: 'Saving bulletin',
                subtitle: error.message,
                body: error.cause?.message,
              });
            },
          });
          start();
          setRecording(true);
        }
      });
    }
  }, [cameraRef, recording]);

  const onStopRecordingPressed = useCallback(() => {
    cameraRef.current?.stopRecording().then(() => {
      showBottomSheet({
        icon: 'folder-outline',
        title: 'Saving bulletin',
        subtitle: "Don't close your device while saving video",
        body: loading,
      });
    });
    reset();
    setRecording(false);
  }, [cameraRef, recording]);

  const loading = useCallback(() => {
    return <ActivityIndicator />;
  }, []);

  const renderCamera = useCallback(() => {
    return (
      <>
        {cameraDevice ? (
          <Camera
            isActive={recording && mediaSettings.video}
            device={cameraDevice}
            style={[StyleSheet.absoluteFillObject]}
            ref={cameraRef}
            onError={onError}
            {...mediaSettings}
          />
        ) : null}
        <View style={styles.sideControls}>
          <Pressable hitSlop={24} onPress={onRotateCamera}>
            <Icon name={'sync-outline'} />
          </Pressable>
        </View>
        <View style={styles.timer}>
          <Text weight="bold" textAlign="center">
            {timer}
          </Text>
        </View>
        <View style={styles.buttons}>
          <SolidButton
            style={styles.button}
            onPress={onAudioPressed}
            disabled={!recording}
            variant="OUTLINED">
            <Icon
              name={mediaSettings.audio ? 'mic-outline' : 'mic-off-outline'}
            />
          </SolidButton>
          <Separator horizontal />
          <RecordButton isRecording={recording} onPress={onRecordPressed} />
          <Separator horizontal />

          <SolidButton
            style={styles.button}
            disabled={!recording}
            onPress={onVideoPressed}
            variant="OUTLINED">
            <Icon
              name={mediaSettings.video ? 'video-outline' : 'video-off-outline'}
            />
          </SolidButton>
        </View>
      </>
    );
  }, [
    cameraDevice,
    mediaSettings.video,
    mediaSettings.audio,
    cameraPosition,
    recording,
    hideBottomSheet,
    showBottomSheet,
    onAudioPressed,
    onRecordPressed,
    onStopRecordingPressed,
    onRotateCamera,
    timer,
  ]);

  return <SafeAreaView style={styles.screen}>{renderCamera()}</SafeAreaView>;
};
export default MediaRecording;
