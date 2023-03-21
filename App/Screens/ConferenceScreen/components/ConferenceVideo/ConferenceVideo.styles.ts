import { Dimensions, StyleSheet } from 'react-native';
import { useColors } from '../../../../Theme';
const { width } = Dimensions.get('window');
const useStyle = (index: number) => {
  const colors = useColors();
  return StyleSheet.create({
    videoWrapper: {
      backgroundColor: index === 0 ? colors.pink : colors.blur,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 8,
      width,
    },
    video: {
      backgroundColor: colors.blur,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },
  });
};
export default useStyle;
