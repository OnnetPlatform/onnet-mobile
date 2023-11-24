import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../../../Theme/Colors';

export const withInsets = (colors: ThemeColors) =>
  StyleSheet.create({
    background: { borderRadius: 32, overflow: 'hidden' },

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
    calendarIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.blur,
      padding: 8,
      borderRadius: 4,
    },
  });
