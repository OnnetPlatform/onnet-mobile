import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    minWidth: 18,
    height: 18,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 12,
    paddingHorizontal: 4,
  },
  indicator: {
    opacity: 0.7,
  },
});
