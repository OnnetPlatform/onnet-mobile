import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  contentBetween: {
    justifyContent: 'space-between',
  },
});
