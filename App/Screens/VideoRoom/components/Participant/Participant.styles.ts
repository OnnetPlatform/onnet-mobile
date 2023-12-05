import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export const useThemedStyle = (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      width: '50%',
      paddingHorizontal: 2,
    },
    container: {
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4,
      width: '100%',
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.secondaryBackground,
    },
  });
