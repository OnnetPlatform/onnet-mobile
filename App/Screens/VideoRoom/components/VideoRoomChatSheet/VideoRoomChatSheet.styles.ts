import { ThemeColors } from 'App/Theme/Colors';
import { StyleSheet } from 'react-native';

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    sheetHint: {
      top: -130,
      alignItems: 'center',
    },
    textCenter: {
      textAlign: 'center',
    },
    arrow: {
      top: -44,
      alignItems: 'center',
    },
    input: {
      padding: 16,
      backgroundColor: colors.secondaryBackground,
      borderWidth: 1,
      borderColor: colors.secondaryBackground,
      marginBottom: 8,
      marginHorizontal: 22,
      borderRadius: 8,
      color: colors.text,
    },
  });

export default withColors;
