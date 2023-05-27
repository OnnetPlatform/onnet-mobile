import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../../Theme/Colors';

export default StyleSheet.create({
  container: {},
  spacer: {
    height: 4,
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      marginHorizontal: -22,
      paddingHorizontal: 32,
      zIndex: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 11,
    },
  });
