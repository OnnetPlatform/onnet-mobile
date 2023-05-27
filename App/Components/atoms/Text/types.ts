import { TextStyle, TextProps as NTP } from 'react-native';
import { AnimateProps } from 'react-native-reanimated';
export type TextProps = {
  children?: any;
  fontSize?: number;
  weight?: 'black' | 'bold' | 'regular' | 'semibold' | 'light';
  color?: string;
  style?: TextStyle;
} & AnimateProps<NTP>;
