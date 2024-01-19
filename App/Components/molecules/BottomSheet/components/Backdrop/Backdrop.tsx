import { BottomSheetBackdropProps, useBottomSheet } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

const BluredBackdrop = ({
  animatedIndex,
  animatedPosition,
}: BottomSheetBackdropProps) => {
  // animated variables
  const { collapse } = useBottomSheet();
  const { width, height } = useWindowDimensions();
  const style = StyleSheet.create({
    backdrop: {
      width,
      height,
      position: 'absolute',
    },
  });
  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(animatedIndex.value, [0, 1], [0, 1]),
    }),
    [animatedIndex]
  );
  const animatedProps = useAnimatedProps(
    () => ({
      blurAmount: interpolate(
        animatedPosition.value,
        [height, height / 2],
        [0, 20],
        Extrapolate.CLAMP
      ),
    }),
    [animatedPosition]
  );

  const containerStyle = useMemo(
    () => [style.backdrop, animatedStyle],
    [style, animatedStyle]
  );

  return (
    <AnimatedBlur
      blurAmount={0}
      style={containerStyle}
      animatedProps={animatedProps}
      onTouchStart={() => collapse()}
    />
  );
};

export default BluredBackdrop;
