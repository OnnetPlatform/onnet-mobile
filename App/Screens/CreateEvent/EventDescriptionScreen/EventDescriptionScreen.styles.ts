import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    textarea: {
      padding: 16,
      minHeight: '100%',
      color: colors.text,
    },
  });
