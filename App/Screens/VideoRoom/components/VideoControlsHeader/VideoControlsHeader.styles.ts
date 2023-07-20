import { StyleSheet, useWindowDimensions } from 'react-native';
import { useColors } from '../../../../Theme';

export const useThemedStyle = () => {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    footerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      top: -44,
      position: 'absolute',
      width: '100%',
      left: 22,
    },
    fab: {
      borderRadius: 90,
      overflow: 'hidden',
      height: 68,
      alignItems: 'center',
      flexDirection: 'row',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
      paddingHorizontal: 16,
      width: width - 44,
    },
    icon: {
      width: 24,
      height: 24,
    },
    iconWrapper: {
      backgroundColor: colors.blur,
      padding: 8,
      borderRadius: 80,
    },
    endCallIcon: {
      padding: 16,
      borderRadius: 80,
      backgroundColor: colors.pink,
    },
  });

  return styles;
};
