import React from 'react';
import { useTextStyle } from './Text.styles';
import { TextProps } from './types';
import Animated from 'react-native-reanimated';

export const Text: React.FC<TextProps> = ({ children, weight = 'regular', style, ...props }) => {
  const styles = useTextStyle({ ...props, weight });

  return (
    <Animated.Text {...props} style={[styles.text, style]}>
      {children}
    </Animated.Text>
  );
};

export default Text;
