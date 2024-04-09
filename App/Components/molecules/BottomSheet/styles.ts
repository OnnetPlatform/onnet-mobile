import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export default (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    background: {
      borderRadius: 32,
      backgroundColor: colors.background,
    },
    bottomSheet: {
      padding: 16,
      borderRadius: 32,
      borderTopColor: colors.secondaryBackground,
      borderTopWidth: 1,
    },
    container: {
      paddingBottom: insets.bottom + 22,
      alignItems: 'center',
      width: '100%',
    },
    mainIcon: {
      width: 64,
      height: 64,
    },
    description: {
      textAlign: 'center',
    },
  });
