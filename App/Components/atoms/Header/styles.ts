import { ThemeColors } from 'App/Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const withColors = (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    header: {
      padding: 16,
      paddingTop: insets.top + 8,
      borderBottomColor: colors.secondaryBackground,
      borderBottomWidth: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    element: {
      flex: 1,
    },
    title: {
      flex: 1,
      textAlign: 'center',
    },
  });
