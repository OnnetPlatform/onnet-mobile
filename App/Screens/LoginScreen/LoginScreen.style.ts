import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../Theme/Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    width: '80%',
  },
  inputsWrapper: {
    alignItems: 'center',
    paddingHorizontal: 22,
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.blur,
      width: '100%',
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.text,
    },
  });
