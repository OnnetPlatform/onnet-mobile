import { Icon } from '@Atoms';
import { ConferenceCreators } from '@Khayat/Redux';
import { ConferenceSelector } from '@Khayat/Redux/Selectors/ConferenceSelector';
import { useColors } from '@Theme';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { useMediaControl } from './useMediaControl';
import { useThemedStyle } from './VideoControlsHeader.styles';

export const VideoControlsHeader: React.FC = () => {
  const { connected } = useSelector(ConferenceSelector);
  const styles = useThemedStyle();
  const colors = useColors();
  const [top, setTop] = useState<number>(0);
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {
    mute,
    unmute,
    enableCamera,
    disableCamera,
    mediaStatus,
    switchCamera,
  } = useMediaControl();

  const animatedWidth = useSharedValue<number>(0);
  const { width } = useWindowDimensions();
  const connect = () => dispatch(ConferenceCreators.connect());
  const diconnect = () => dispatch(ConferenceCreators.disconnect());

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.background,
    borderRadius: 80,
    width: animatedWidth.value,
    borderWidth: 1,
    borderColor: colors.secondaryBackground,
  }));

  useEffect(() => {
    animatedWidth.value = withTiming(!connected ? 72 : width - 44, {
      duration: 200,
    });
  }, [connected]);

  useEffect(() => {
    console.log(mediaStatus);
  }, [mediaStatus]);

  const switchSpeaker = useCallback(() => {}, []);

  return (
    <View
      onLayout={({ nativeEvent: { layout } }) =>
        top === 0 ? setTop(-layout.height - bottom) : null
      }
      style={[styles.footerWrapper, { top }]}>
      <Animated.View style={[animatedStyle, styles.fab]}>
        <View style={styles.footer}>
          {connected ? (
            <Pressable
              onPress={mediaStatus.video ? disableCamera : enableCamera}
              style={styles.iconWrapper}>
              <Icon
                style={styles.icon}
                name={mediaStatus.video ? 'video-outline' : 'video-off-outline'}
                fill={colors.text}
              />
            </Pressable>
          ) : (
            <Pressable onPress={connect} style={styles.iconWrapper}>
              <Icon style={styles.icon} name={'wifi-outline'} />
            </Pressable>
          )}
          <Pressable
            onPress={mediaStatus.audio ? mute : unmute}
            style={styles.iconWrapper}>
            <Icon
              style={styles.icon}
              name={!mediaStatus.audio ? 'mic-off-outline' : 'mic-outline'}
              pack={''}
              fill={colors.text}
            />
          </Pressable>
          <Pressable onPress={diconnect} style={styles.endCallIcon}>
            <Icon
              style={styles.icon}
              name={'phone-outline'}
              pack={''}
              fill={colors.text}
            />
          </Pressable>

          <Pressable onPress={switchCamera} style={styles.iconWrapper}>
            <Icon
              style={styles.icon}
              name={'sync-outline'}
              pack={''}
              fill={colors.text}
            />
          </Pressable>

          <Pressable onPress={switchSpeaker} style={styles.iconWrapper}>
            <Icon
              style={styles.icon}
              name={'volume-up-outline'}
              pack={''}
              fill={colors.text}
            />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default React.memo(VideoControlsHeader);
