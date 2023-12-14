import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

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
    alignSelf: 'center',
    marginTop: 16,
  },
  inputsWrapper: {
    alignItems: 'center',
    width: '80%',
    flex: 1,
    flexGrow: 1,
    alignSelf: 'center',
  },
  mleft: {
    marginLeft: 8,
  },
  mvertical: { marginVertical: 22 },
  w100: {
    width: '100%',
  },
  mbottom: {
    marginBottom: 22,
  },
  cta: {
    alignSelf: 'center',
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
