import React from 'react';
import { CardProps } from './types';
import styles from './Card.styles';
import { BlurView } from '@react-native-community/blur';
import { useColorScheme } from 'react-native';

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <BlurView blurAmount={10} blurType={isDark ? 'dark' : 'light'} style={[styles.card, style]}>
      {children}
    </BlurView>
  );
};
export default Card;
