import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../../Theme/Colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  spacer: {
    height: 4,
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      padding: 11,
      marginHorizontal: -22,
      paddingHorizontal: 32,
      zIndex: 10,
      backgroundColor: colors.blur,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
