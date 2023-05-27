import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { useColorScheme } from 'react-native';
import { BlurProps } from './types';

export const Blur: React.FC<BlurProps> = ({ children, ...props }) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <BlurView {...props} blurType={isDark ? 'dark' : 'light'}>
      {children}
    </BlurView>
  );
};

export default Blur;
