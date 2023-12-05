import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const useThemeStyle = (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    header: {
      padding: 16,
      backgroundColor: colors.secondaryBackground,
      paddingTop: insets.top + 16,
      marginBottom: 8,
      borderBottomColor: colors.background,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
