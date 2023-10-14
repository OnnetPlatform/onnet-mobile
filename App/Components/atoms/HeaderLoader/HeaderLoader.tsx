import React, {useEffect} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useColors} from '@Theme';
import {ViewStyle, useWindowDimensions} from 'react-native';

export const HeaderLoader: React.FC<{style?: ViewStyle}> = ({style}) => {
  const colors = useColors();
  const {width} = useWindowDimensions();
  const animatedWidth = useSharedValue(0);
  const animatedstyle = useAnimatedStyle(
    () => ({
      width: animatedWidth.value,
      height: 0.5,
      alignSelf: 'center',
      borderRadius: 1,
      backgroundColor: interpolateColor(
        animatedWidth.value,
        [0, width / 3, (width * 2) / 3, width],
        [colors.background, colors.text, colors.text, colors.background],
      ),
    }),
    [animatedWidth],
  );

  useEffect(() => {
    if (!width) return;
    animatedWidth.value = 0;
    animatedWidth.value = withRepeat(
      withTiming(width, {duration: 700}),
      -1,
      false,
    );
  }, [width]);

  return <Animated.View style={[animatedstyle, style]} />;
};
