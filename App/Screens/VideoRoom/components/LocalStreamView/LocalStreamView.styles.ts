import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  stream: {
    position: 'absolute',
    width: 150,
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'red',
    bottom: 22,
    right: 22,
    zIndex: 100,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
