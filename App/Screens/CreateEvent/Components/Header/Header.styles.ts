import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      paddingHorizontal: 22,
      backgroundColor: colors.secondaryBackground,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
