import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { useThemedStyle } from './VideoControlsHeader.styles';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useColors } from '../../../../Theme';
import { Icon } from '../../../../Components/atoms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWebrtcContext } from '../../../../Context/WebrtcContext';
import { useMediaControl } from './useMediaControl';
export const VideoControlsHeader: React.FC = () => {
  const { leave, join, connected } = useWebrtcContext();
  const styles = useThemedStyle();
  const colors = useColors();
  const [top, setTop] = useState<number>(0);
  const { bottom } = useSafeAreaInsets();
  const { mute, unmute, enableCamera, disableCamera, mediaStatus, switchCamera } =
    useMediaControl();

  const animatedWidth = useSharedValue<number>(0);
  const { width } = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedWidth.value,
      [68, width - 44],
      [colors.background, colors.blur]
    ),
    borderRadius: 80,
    width: animatedWidth.value,
  }));
  useEffect(() => {
    animatedWidth.value = withTiming(!connected ? 68 : width - 44, { duration: 200 });
  }, [connected]);

  const switchSpeaker = useCallback(() => {}, []);

  return (
    <View
      onLayout={({ nativeEvent: { layout } }) => setTop(-layout.height - bottom)}
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
              />
            </Pressable>
          ) : (
            <Pressable onPress={join} style={styles.iconWrapper}>
              <Icon style={styles.icon} name={'wifi-outline'} />
            </Pressable>
          )}
          <Pressable onPress={mediaStatus.audio ? mute : unmute} style={styles.iconWrapper}>
            <Icon
              style={styles.icon}
              name={!mediaStatus.audio ? 'mic-off-outline' : 'mic-outline'}
              pack={''}
            />
          </Pressable>
          <Pressable onPress={leave} style={styles.endCallIcon}>
            <Icon style={styles.icon} name={'phone-outline'} pack={''} />
          </Pressable>

          <Pressable onPress={switchCamera} style={styles.iconWrapper}>
            <Icon style={styles.icon} name={'sync-outline'} pack={''} />
          </Pressable>

          <Pressable onPress={switchSpeaker} style={styles.iconWrapper}>
            <Icon style={styles.icon} name={'volume-up-outline'} pack={''} />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

export default React.memo(VideoControlsHeader, function (prev, next) {
  return true;
});
