import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';

export type ButtonProps = {
  children: string | ReactElement;
  onPress?(): void;
  style?: ViewStyle;
  variant?: 'REGULAR' | 'SHADOW';
};
