import { TextProps as NTP, TextStyle } from 'react-native';
import { AnimateProps } from 'react-native-reanimated';

export type TextProps = {
  children?: any;
  fontSize?: number;
  weight?: 'black' | 'bold' | 'regular' | 'semibold' | 'light';
  color?: string;
  style?: TextStyle;
  textAlign?: TextStyle['textAlign'];
} & AnimateProps<NTP>;

export type TextVariants = 'sm' | 'md' | 'lg';
/**
 * xs:8
 * sm:10
 * md:12
 * lg:14
 * xl:16
 */
