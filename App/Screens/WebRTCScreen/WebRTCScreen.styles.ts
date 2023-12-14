import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  localStream: {
    backgroundColor: '#050A0E',
    width: 150,
    height: 200,
    margin: 22,
    top: 48,
    position: 'absolute',
    borderRadius: 16,
    right: 0,
    zIndex: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    position: 'absolute',
    bottom: 48,
    width: '100%',
  },
});
