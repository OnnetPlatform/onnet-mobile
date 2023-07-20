import React from 'react';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { View } from 'react-native';
import styles from './LocalStreamView.styles';
import { Text } from '../../../../Components/atoms';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
export const LocalStreamView: React.FC<{ localStream: MediaStream | undefined }> = ({
  localStream,
}) => {
  const translationX = useSharedValue<number>(0);
  const translationY = useSharedValue<number>(0);
  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (event, ctx) => {
      ctx.x = translationX.value;
      ctx.y = translationY.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.x + event.translationX;
      translationY.value = ctx.x + event.translationY;
    },
    onEnd: (event, ctx) => {
      ctx.x = translationX.value;
      ctx.y = translationY.value;
    },
  });
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: translationX.value,
        },
        {
          translateY: translationY.value,
        },
      ],
    }),
    [translationX, translationY]
  );
  if (!localStream)
    return (
      <View style={styles.stream}>
        <View style={styles.centerView}>
          <Text>Not initialized...</Text>
        </View>
      </View>
    );

  return (
    <PanGestureHandler onGestureEvent={handler}>
      <Animated.View style={[animatedStyle, styles.container]}>
        <RTCView objectFit="cover" streamURL={localStream.toURL()} style={styles.stream} />
      </Animated.View>
    </PanGestureHandler>
  );
};
export default LocalStreamView;
