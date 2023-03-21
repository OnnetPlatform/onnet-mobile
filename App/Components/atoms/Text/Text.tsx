import React from 'react';
import { useTextStyle } from './Text.styles';
import { TextProps } from './types';
import { Text as RNText } from 'react-native';

export const Text: React.FC<TextProps> = ({ children, weight = 'regular', style, ...props }) => {
  const styles = useTextStyle({ ...props, weight });

  return (
    <RNText {...props} style={[styles.text, style]}>
      {children}
    </RNText>
  );
};

export default Text;
