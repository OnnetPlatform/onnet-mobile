import React, { useEffect } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import styles from './Avatar.styles';
import { useColors } from '@Theme';
import { Image } from 'react-native';

export const Avatar: React.FC<{ avatar: string; isActive: boolean }> = ({
  avatar,
  isActive,
}) => {
  const colors = useColors();
  const borderActive = useSharedValue(isActive ? 1 : 0);

  const animatedImageStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        borderActive.value,
        [1, 0],
        [colors.text, colors.background]
      ),
      shadowColor: interpolateColor(
        borderActive.value,
        [1, 0],
        [colors.text, colors.background]
      ),
      backgroundColor: colors.background,
    }),
    [isActive, colors]
  );

  useEffect(() => {
    borderActive.value = withTiming(isActive ? 1 : 0);
  }, [isActive]);

  return (
    <Animated.View style={[animatedImageStyle, styles.shadow]}>
      <Image
        source={{ uri: avatar }}
        style={[
          styles.avatar,
          { borderColor: isActive ? colors.text : colors.background },
        ]}
      />
    </Animated.View>
  );
};

export default Avatar;
