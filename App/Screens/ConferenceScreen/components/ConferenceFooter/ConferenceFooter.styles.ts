import { StyleSheet, useWindowDimensions } from 'react-native';
import { useColors } from '../../../../Theme';

export const useThemedStyle = () => {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    footerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
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
      padding: 16,
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
