import { StyleSheet } from 'react-native';

export default (width: number) =>
  StyleSheet.create({
    text: {
      width: width / 7,
      height: width / 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    currentMonth: {
      textAlign: 'center',
      marginBottom: 8,
    },
  });
