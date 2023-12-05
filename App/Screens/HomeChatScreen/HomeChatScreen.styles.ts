import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export default (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    header: {
      padding: 16,
      paddingTop: insets.top,
      marginTop: -insets.top,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: 'transparent',
    },
    logoWrapper: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.secondaryBackground,
      marginRight: 8,
    },
    logo: {
      width: 18,
      height: 18,
    },
    rowWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
