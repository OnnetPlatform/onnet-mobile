import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../Theme/Colors';

export default (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    page: {
      flex: 1,
      flexGrow: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.background,
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
      marginTop: -insets.top,
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
      backgroundColor: colors.secondaryBackground,
      overflow: 'hidden',
      borderRadius: 16,
      paddingLeft: 22,
    },
    typingText: {
      opacity: 0.7,
      color: colors.text,
    },
    separator: {
      height: 16,
    },
    contentStyle: {
      paddingBottom: insets.top,
    },
    messageContainer: {
      backgroundColor: colors.secondaryBackground,
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
      width: 24,
      height: 24,
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
