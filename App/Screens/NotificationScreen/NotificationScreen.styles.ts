import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../Theme/Colors';
import { EdgeInsets } from 'react-native-safe-area-context';

export default StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
  },
  titleLeft: {
    marginLeft: 16,
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    sectionHeader: {
      textTransform: 'uppercase',
      padding: 22,
      backgroundColor: colors.background,
    },
  });
export const withInsets = (insets: EdgeInsets) =>
  StyleSheet.create({
    header: {
      padding: 16,
      paddingTop: insets.top + 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
