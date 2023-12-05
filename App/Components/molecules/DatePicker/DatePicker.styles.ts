import { fonts } from '@Theme';
import { ThemeColors } from '@Theme/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
    clockComponent: {
      width: width - 64,
      padding: 16,
      borderRadius: 16,
      alignSelf: 'center',
      overflow: 'hidden',
      height: '100%',
      borderColor: colors.text,
    },
    number: {
      textAlign: 'center',
      fontSize: 48,
      fontFamily: fonts.bold,
      color: colors.text,
      textAlignVertical: 'center',
      width: 80,
      alignSelf: 'center',
    },
    subtitle: {
      textTransform: 'uppercase',
      fontSize: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    checkButton: {
      width: 24,
      height: 24,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.text,
    },
    checkIcon: {
      width: 18,
      height: 18,
    },
    section: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
    },
  });

export const indicatorStyle = (colors: ThemeColors, layout: any) =>
  StyleSheet.create({
    indicator: {
      height: 24,
      width: 2,
      backgroundColor: colors.text,
      position: 'absolute',
      bottom: -24,
      transform: [
        {
          translateX: layout ? layout.pageX - 1 + layout.width / 2 : 0,
        },
      ],
    },
  });
