import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.secondaryBackground,
      padding: 16,
      paddingHorizontal: 22,
    },
  });
