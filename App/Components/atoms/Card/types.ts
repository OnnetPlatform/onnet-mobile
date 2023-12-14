import {ViewStyle} from 'react-native';
import {ThemeColors} from '@Theme/Colors';

export type CardProps = {
  style?: ViewStyle;
  children?: any;
};

export const CardColors = (colors: ThemeColors) => [colors.cyan, colors.blur];
