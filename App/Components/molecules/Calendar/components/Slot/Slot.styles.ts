import { StyleSheet } from 'react-native';

export default (width: number) =>
  StyleSheet.create({
    slot: {
      padding: 4,
      width,
      height: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
