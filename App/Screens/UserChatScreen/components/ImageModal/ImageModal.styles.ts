import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  shadow: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,.9)',
    justifyContent: 'center',
  },
  closeWrapper: {
    right: 16,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.4)',
    top: 80,
    height: 24,
    width: 24,
    borderRadius: 12,
  },
});
