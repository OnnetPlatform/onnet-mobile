import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  closeIcon: {
    overflow: 'hidden',
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width,
  },
  left: {
    marginLeft: 16,
  },
  top: {
    marginTop: 4,
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    minWidth: width / 5,
    height: '100%',
  },
});
