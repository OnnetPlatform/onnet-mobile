import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export default (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    section: {
      padding: 22,
      paddingBottom: insets.bottom,
      borderRadius: 22,
      overflow: 'hidden',
    },
    separator: {
      marginVertical: 22,
    },
    button: {
      padding: 22,
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
