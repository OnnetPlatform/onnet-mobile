import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import { useColors } from '../../../Theme';
import { useWindowDimensions } from 'react-native';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export const HeaderLoader: React.FC = () => {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const animatedWidth = useSharedValue(width / 2);
  const style = useAnimatedStyle(() => ({
    width: animatedWidth.value,
    height: 1,
    alignSelf: 'center',
    borderRadius: 1,
  }));

  useEffect(() => {
    animatedWidth.value = 0;
    animatedWidth.value = withRepeat(
      withDelay(
        100,
        withSpring(width, { damping: 1000 }, (isFinished) => {})
      ),
      -1,
      false
    );
  }, [width]);
  return (
    <AnimatedGradient
      style={style}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.cyan, colors.pink, colors.turquoise, colors.yellow]}></AnimatedGradient>
  );
};
