import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 120,
  },
  spacer: {
    height: 4,
  },
});

export const withColors = () =>
  StyleSheet.create({
    header: {
      marginHorizontal: -22,
      paddingHorizontal: 32,
      zIndex: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 11,
    },
  });
