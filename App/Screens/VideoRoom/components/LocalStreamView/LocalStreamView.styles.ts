import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  stream: {
    flex: 1,
    flexGrow: 1,
    zIndex: 100,
  },
  container: {
    width: 150,
    height: 200,
    position: 'absolute',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'red',
  },
});
