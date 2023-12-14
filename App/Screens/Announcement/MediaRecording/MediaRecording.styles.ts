import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export default (insets: EdgeInsets, colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    buttons: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 100,
      bottom: insets.bottom + 22,
      width: '100%',
      justifyContent: 'center',
    },
    button: {
      paddingHorizontal: 16,
    },
    sideControls: {
      position: 'absolute',
      top: insets.top + 22,
      right: 22,
      zIndex: 100,
    },
    timer: {
      position: 'absolute',
      top: insets.top + 22,
      alignSelf: 'center',
      zIndex: 100,
    },
  });
