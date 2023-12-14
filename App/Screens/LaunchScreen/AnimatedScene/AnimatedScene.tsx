import React, { ReactElement } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import styles from './AnimatedScene.styles';
export const AnimatedScene: React.FC<{ children: ReactElement | ReactElement[] }> = ({
  children,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(100).duration(900)} style={styles.section}>
      {children}
    </Animated.View>
  );
};
