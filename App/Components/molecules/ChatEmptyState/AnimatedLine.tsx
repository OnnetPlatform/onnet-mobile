import { useColors } from '@Theme/index';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export const AnimatedLine: React.FC<{ width: number }> = ({ width }) => {
  const progress = useSharedValue(0);
  const colors = useColors();
  const animatedStyle = useAnimatedStyle(
    () => ({
      width: `${progress.value}%`,
      opacity: interpolate(progress.value, [0, width], [0.1, width / 100]),
    }),
    [width, progress]
  );
  useEffect(() => {
    progress.value = withDelay(500, withTiming(width, { duration: 2000 }));
  }, []);

  return (
    <Animated.View
      style={[
        styles.line,
        animatedStyle,
        {
          backgroundColor: colors.text,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    height: 12,
    borderRadius: 8,
  },
});
