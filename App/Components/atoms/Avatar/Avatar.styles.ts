import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
    backgroundColor: '#898989',
  },
  indicatorWrapper: {
    width: 15,
    height: 15,
    borderRadius: 8,
    position: 'absolute',
    borderWidth: 8,
    right: 4,
    bottom: -4,
    justifyContent: 'center',
  },
  indicator: {
    width: 9,
    height: 9,
    borderRadius: 6,
    borderWidth: 2,
    alignSelf: 'center',
  },
});
