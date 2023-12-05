import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    item: {
      padding: 16,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateTitle: {
      textAlign: 'center',
    },
    body: {
      padding: 22,
    },
  });
