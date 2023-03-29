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
    typingText: {
      padding: 8,
      opacity: 0.7,
      paddingBottom: 0,
      marginLeft: 40,
    },
    separator: {
      height: 16,
    },
    contentStyle: {
      paddingBottom: insets.top,
    },
    messageContainer: {
      backgroundColor: colors.background,
      borderColor: colors.blur,
      width: '100%',
      padding: 8,
      borderRadius: 16,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 1,
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
  });
