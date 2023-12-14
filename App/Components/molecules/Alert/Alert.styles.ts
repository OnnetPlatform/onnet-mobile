import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: 'rgba(0,0,0,.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 8,
      overflow: 'hidden',
    },
    linearGradient: {
      padding: 2,
      borderRadius: 9,
      overflow: 'hidden',
      width: '80%',
    },
  });
