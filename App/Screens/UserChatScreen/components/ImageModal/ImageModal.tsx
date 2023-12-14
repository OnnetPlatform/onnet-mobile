import { Icon } from '@Atoms';
import React, { ReactElement } from 'react';
import {
  Image,
  Modal,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const context = useSharedValue({ x: 0, y: 0 });

  const gesturehandler = Gesture.Simultaneous(
    Gesture.Pinch().onUpdate((e) => {
      scale.value = e.scale;
    }),
    Gesture.Pan()
      .onStart(() => {
        context.value = { x: translateX.value, y: translateY.value };
      })
      .onUpdate((e) => {
        translateX.value = e.translationX + context.value.x;
        translateY.value = e.translationY + context.value.y;
      }),
    Gesture.Tap().onStart(() => {
      scale.value = withTiming(1, { duration: 100, easing: Easing.linear });
      translateY.value = withTiming(0, {
        duration: 100,
        easing: Easing.linear,
      });
      translateX.value = withTiming(0, {
        duration: 100,
        easing: Easing.linear,
      });
    })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <>
      {children}
      {visible ? (
        <Modal
          animationType="fade"
          transparent
          onRequestClose={onRequestClose}
          visible={visible}>
          <View style={styles.shadow}>
            <Pressable style={styles.closeWrapper} onPress={onRequestClose}>
              <Icon name={'close-outline'} />
            </Pressable>
            <GestureDetector gesture={gesturehandler}>
              <Animated.View style={animatedStyle}>
                <Image
                  style={{
                    width,
                    height: (width * imageHeight) / imageWidth,
                  }}
                  source={{ uri: URL + image.filename }}
                />
              </Animated.View>
            </GestureDetector>
          </View>
        </Modal>
      ) : null}
    </>
  );
};
export default ImageModal;
