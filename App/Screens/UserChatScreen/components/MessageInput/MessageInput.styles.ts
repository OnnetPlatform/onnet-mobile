import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('screen');
export default StyleSheet.create({
  header: {
    alignSelf: 'flex-end',
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
  image: {
    width: width / 3,
    height: width / 3,
    borderRadius: 8,
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: width / 3,
  },
  attachedImageWrapper: {
    width: width / 3,
    height: width / 3,
    padding: 1,
  },
  attachedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
