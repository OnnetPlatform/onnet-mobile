import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export default (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    background: {
      borderRadius: 32,
      backgroundColor: colors.secondaryBackground,
    },
    bottomSheet: {
      padding: 16,
    },
    container: {
      paddingBottom: insets.bottom + 22,
      alignItems: 'center',
    },
    mainIcon: {
      width: 64,
      height: 64,
    },
    description: {
      textAlign: 'center',
    },
  });
