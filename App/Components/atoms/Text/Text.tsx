import React from 'react';
import Animated from 'react-native-reanimated';

import { useTextStyle } from './Text.styles';
import { TextProps } from './types';

export const Text: React.FC<TextProps> = ({
  children,
  weight = 'regular',
  style,
  ...props
}) => {
  const styles = useTextStyle({
    ...props,
    weight,
    fontSize: props.fontSize || 12,
  });

  return (
    <Animated.Text {...props} style={[styles.text, style]}>
      {children}
    </Animated.Text>
  );
};

export default Text;
