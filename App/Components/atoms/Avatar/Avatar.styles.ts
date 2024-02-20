import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    borderRadius: 14,
  },
});
