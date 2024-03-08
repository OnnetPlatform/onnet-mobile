import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      height: 48,
      width: 48,
      borderRadius: 24,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    wave: {
      height: 48,
      width: 300,
    },
    wave_container: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
  });
