import { Image, Modal, Pressable, useWindowDimensions, View } from 'react-native';
import React, { ReactElement } from 'react';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '../../../../Components/atoms';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { UploadedImage } from '../../../../../types';
import { URL } from '../../../../Services/Fetch';
import styles from './ImageModal.styles';

export const ImageModal: React.FC<{
  children: ReactElement;
  visible: boolean;
  onRequestClose(): void;
  image: UploadedImage;
}> = ({ children, visible, onRequestClose, image }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { width } = useWindowDimensions();
  const { width: imageWidth, height: imageHeight } = image;

  const handler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    { focalX: number; focalY: number }
  >({
    onStart: (e, ctx) => {
      ctx.focalX = e.focalX;
      ctx.focalY = e.focalY;
    },
    onActive: (e) => {
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
          <View style={styles.shadow}>
            <Pressable style={styles.closeWrapper} onPress={onRequestClose}>
              <Icon name={'close-outline'} />
            </Pressable>
            <PinchGestureHandler onGestureEvent={handler}>
              <Animated.View style={animatedStyle}>
                <Image
                  style={{
                    width,
                    height: (width * imageHeight) / imageWidth,
                  }}
                  source={{ uri: URL + image.filename }}
                />
              </Animated.View>
            </PinchGestureHandler>
          </View>
        </Modal>
      ) : null}
    </>
  );
};
export default ImageModal;
