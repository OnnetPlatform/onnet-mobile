import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../Theme/Colors';

export default (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    header: {
      padding: 16,
      paddingTop: insets.top,
      marginTop: -insets.top,
      backgroundColor: colors.blur,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
  });
