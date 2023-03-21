import { ReactElement } from 'react';
import { TextStyle, TextProps as NTP } from 'react-native';
import Text from './Text';
export type TextProps = {
  children?: string | ReactElement<typeof Text> | number | any;
  fontSize?: number;
  weight?: 'black' | 'bold' | 'regular' | 'semibold' | 'light';
  color?: string;
  style?: TextStyle;
} & NTP;
