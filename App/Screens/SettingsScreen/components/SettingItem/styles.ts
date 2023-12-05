import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      paddingHorizontal: 8,
    },
    between: {
      justifyContent: 'space-between',
    },
    icon: {
      width: 14,
      height: 14,
      opacity: 0.8,
    },
  });
export default withColors;
