import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    overflow: 'hidden',
    margin: 2,
  },
  textButton: {
    textAlign: 'center',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6.27,
    elevation: 10,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
