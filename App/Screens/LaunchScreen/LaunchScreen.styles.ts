import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../Theme/Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'flex-start',
    width: '100%',
    padding: 22,
  },
  title: {
    color: 'rgba(255,255,255,.8)',
    fontWeight: '900',
    textTransform: 'capitalize',
    fontSize: 36,
    letterSpacing: 2,
  },
  hint: {
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: '70%',
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  bottomSection: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export const withInsets = (insets: EdgeInsets, colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      width: 48,
      height: 48,
      backgroundColor: colors.yellow,
      position: 'absolute',
      bottom: insets.bottom + 24,
      right: insets.bottom,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
