import { ThemeColors } from 'App/Theme/Colors';
import { StyleSheet } from 'react-native';

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      borderColor: colors.secondaryBackground,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      paddingHorizontal: 8,
    },
  });
export default withColors;
