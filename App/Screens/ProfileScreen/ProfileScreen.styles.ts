import { BOTTOM_BAR_HEIGHT } from '@Theme';
import { ThemeColors } from '@Theme/Colors';
import { Dimensions, StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('screen');
export default (insets: EdgeInsets, colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 11,
      paddingTop: insets.top,
      marginTop: -insets.top,
      paddingBottom: 22,
    },
    linearGradient: {
      justifyContent: 'space-between',
    },
    spacer: {
      height: (height - BOTTOM_BAR_HEIGHT) * 0.5,
    },
    content: {
      padding: 22,
      minHeight: (height - BOTTOM_BAR_HEIGHT) * 0.5,
      justifyContent: 'flex-end',
    },
    textRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    info: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 22,
      paddingBottom: BOTTOM_BAR_HEIGHT,
      paddingTop: 0,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    backArrow: {
      position: 'absolute',
      width: 36,
      height: 36,
      backgroundColor: colors.blur,
      top: insets.top,
      marginLeft: 22,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      left: 0,
    },
    limit: {
      backgroundColor: colors.background,
      width: '100%',
      height: height,
      position: 'absolute',
      bottom: -height,
    },
  });
