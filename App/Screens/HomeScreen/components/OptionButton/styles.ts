import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    minWidth: 54,
    maxHeight: 54,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 27,
    position: 'absolute',
    right: 22,
    flexDirection: 'row',
    padding: 16,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 18,
    height: 18,
  },
});
