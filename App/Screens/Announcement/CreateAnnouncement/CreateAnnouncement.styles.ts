import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    input: {
      paddingVertical: 16,
      borderRadius: 8,
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 18,
    },
    buttonText: {
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 100,
      backgroundColor: colors.turquoise,
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flex: {
      flex: 1,
    },
    infoIcon: {
      width: 12,
    },
  });
