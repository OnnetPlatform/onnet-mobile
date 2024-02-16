import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import styles from './Avatar.styles';
import { useColors } from '@Theme/index';

export const Avatar: React.FC<{ avatar: string; isActive: boolean }> = ({
  avatar,
  isActive,
}) => {
  const borderWidth = useSharedValue(0);
  const colors = useColors();
  const animatedImageStyle = useAnimatedStyle(
    () => ({
      borderColor: colors.text,
      borderWidth: borderWidth.value,
      borderRadius: 14,
      overflow: 'hidden',
    }),
    [borderWidth, isActive]
  );

  useEffect(() => {
    borderWidth.value = withTiming(isActive ? 2 : 0);
  }, [isActive]);

  return (
    <Animated.View style={animatedImageStyle}>
      <Animated.Image source={{ uri: avatar }} style={styles.avatar} />
    </Animated.View>
  );
};

export default Avatar;
