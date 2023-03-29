import { ReactElement } from 'react';
import { TextStyle, TextProps as NTP } from 'react-native';
import Text from './Text';
export type TextProps = {
  children?: any;
  fontSize?: number;
  weight?: 'black' | 'bold' | 'regular' | 'semibold' | 'light';
  color?: string;
  style?: TextStyle;
} & NTP;
