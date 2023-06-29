import { Dimensions, StyleSheet } from 'react-native';
const { height } = Dimensions.get('window');
export default StyleSheet.create({
  story: {
    overflow: 'hidden',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
});
