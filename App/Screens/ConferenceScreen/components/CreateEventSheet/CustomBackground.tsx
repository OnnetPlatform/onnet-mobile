import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({ animatedIndex }) => {
  const isDark = useColorScheme() == 'dark';
  return (
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType={isDark ? 'dark' : 'light'}
      blurAmount={100}
    />
  );
};
