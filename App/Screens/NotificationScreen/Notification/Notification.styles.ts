import { Dimensions, StyleSheet } from 'react-native';
import { pink } from '../../../Theme/Colors';
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
    justifyContent: 'center',
    backgroundColor: pink,
    alignItems: 'center',
  },
});
