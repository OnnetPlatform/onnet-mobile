import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    input: {
      color: colors.text,
      padding: 16,
      backgroundColor: colors.background,
      borderRadius: 8,
    },
  });
