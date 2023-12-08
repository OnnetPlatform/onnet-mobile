import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';

export type Variant = 'ROUNDED' | 'OUTLINED';

export type SolidButtonProps = {
  title?: string;
  variant?: Variant;
  color?: string;
  textColor?: string;
  children?: ReactElement;
  style?: ViewStyle;
};
