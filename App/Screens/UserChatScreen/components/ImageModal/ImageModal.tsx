import { Modal, Pressable, useWindowDimensions, View } from 'react-native';
import React, { ReactElement } from 'react';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '../../../../Components/atoms';
import {
  Gesture,
  GestureDetector,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { PinchGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/pinchGesture';

export const ImageModal: React.FC<{
  children: ReactElement;
  visible: boolean;
  onRequestClose(): void;
}> = ({ children, visible, onRequestClose }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { width } = useWindowDimensions();
  const handler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    { focalX: number; focalY: number }
  >({
    onStart: (e, ctx) => {
      ctx.focalX = e.focalX;
      ctx.focalY = e.focalY;
    },
    onActive: (e, ctx) => {
      scale.value = e.scale;
      console.log(e.focalX, e.focalY, e.state);
      translateX.value = e.focalX;
      translateY.value = e.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1, { duration: 1000, easing: Easing.linear });
      translateY.value = withTiming(0, { duration: 1000, easing: Easing.linear });
      translateX.value = withTiming(0, { duration: 1000, easing: Easing.linear });
    },
  });
  const pinch = Gesture.Pinch()
    .onBegin((e) => {
      scale.value = e.scale;
      translateX.value = e.focalX;
      translateY.value = e.focalY;
    })
    .onUpdate((e) => {
      scale.value = e.scale;
      console.log(e.focalX, e.focalY, e.state);
      translateX.value = e.focalX;
      translateY.value = e.focalY;
    })
    .onEnd(() => {
      scale.value = withTiming(1, { duration: 1000, easing: Easing.linear });
      translateY.value = withTiming(0, { easing: Easing.linear });
      translateX.value = withTiming(0, { easing: Easing.linear });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -translateX.value },
      { translateY: -translateY.value },
      { translateX: (width - 44) / 2 },
      { translateY: 100 },
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { translateX: -(width - 44) / 2 },
      { translateY: -100 },
    ],
  }));

  return (
    <>
      {children}
      {visible ? (
        <Modal animationType="fade" transparent onRequestClose={onRequestClose} visible={visible}>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              paddingHorizontal: 22,
            }}>
            <Pressable style={{ alignSelf: 'flex-end' }} onPress={onRequestClose}>
              <Icon name={'close-outline'} />
            </Pressable>
            {/* 
            <GestureDetector gesture={pinch}>
              <Animated.View style={animatedStyle}>{children}</Animated.View>
            </GestureDetector> */}
            <PinchGestureHandler onGestureEvent={handler}>
              <Animated.View style={animatedStyle}>{children}</Animated.View>
            </PinchGestureHandler>
          </View>
        </Modal>
      ) : null}
    </>
  );
};
export default ImageModal;
