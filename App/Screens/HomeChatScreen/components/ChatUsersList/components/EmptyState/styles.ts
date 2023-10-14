import {StyleSheet, Dimensions} from 'react-native';
import {ThemeColors} from '../../../../../../Theme/Colors';
const {width, height} = Dimensions.get('window');

export default (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height,
      top: -120,
      zIndex: -1,
    },
    container: {
      width: '80%',
      backgroundColor: colors.blur,
      padding: 16,
      borderRadius: 8,
    },
    title: {
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    subtitle: {
      marginTop: 8,
      textAlign: 'center',
    },
  });
