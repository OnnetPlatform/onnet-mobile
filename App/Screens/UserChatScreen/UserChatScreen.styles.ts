import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../Theme/Colors';
import { BOTTOM_BAR_HEIGHT } from '../../Theme';

export default (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    page: {
      flex: 1,
      flexGrow: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      paddingBottom: BOTTOM_BAR_HEIGHT,
    },
    headerBack: {
      width: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: insets.top,
      position: 'absolute',
      width: '100%',
      zIndex: 100,
    },
    headerAvatar: {
      marginLeft: 16,
    },
    handleWrapper: {
      justifyContent: 'center',
      height: 33,
    },
    handleIndicator: {
      height: 3,
      width: 40,
      backgroundColor: colors.text,
      alignSelf: 'center',
      position: 'absolute',
      zIndex: 100,
      borderRadius: 4,
      opacity: 0.6,
    },
    typingWrapper: {
      overflow: 'hidden',
      borderRadius: 16,
      paddingLeft: 22,
    },
    typingText: {
      color: colors.text,
    },
    separator: {
      height: 16,
    },
    contentStyle: {
      paddingVertical: insets.top,
      paddingBottom: 220,
    },
    messageContainer: {
      borderColor: colors.blur,
      padding: 8,
      borderRadius: 16,
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    messageInput: {
      padding: 16,
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: 8,
    },
    messageWrapper: {
      marginTop: 4,
    },
    flex: {
      flex: 1,
    },
    icon: {
      width: 18,
      height: 18,
    },
    maskedView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
    },
    footerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeIcon: {
      position: 'absolute',
      top: 4,
      zIndex: 100,
      right: 4,
      backgroundColor: colors.background,
      width: 24,
      height: 24,
      borderRadius: 12,
    },
  });
