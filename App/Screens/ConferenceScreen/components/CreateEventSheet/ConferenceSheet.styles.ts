import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../../../Theme/Colors';

export const withInsets = (insets: EdgeInsets, colors: ThemeColors) =>
  StyleSheet.create({
    sheet: {
      borderRadius: 32,
      overflow: 'hidden',
    },
    bottomSheetBody: {
      padding: 32,
    },
    title: {
      marginBottom: 16,
      textTransform: 'uppercase',
    },
    label: {
      marginBottom: 8,
      textAlignVertical: 'center',
    },
    titleInput: {
      padding: 16,
      borderRadius: 4,
      backgroundColor: colors.blur,
      marginBottom: 16,
    },
  });
