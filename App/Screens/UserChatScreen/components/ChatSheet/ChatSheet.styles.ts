import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

export default (colors: ThemeColors) =>
  StyleSheet.create({
    messageContainer: {
      overflow: 'hidden',
      backgroundColor: colors.blur,
      borderRadius: 8,
    },
    featureWrapper: {
      paddingHorizontal: 16,
      backgroundColor: colors.blur,
      borderRadius: 16,
      marginTop: 16,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageInput: {
      color: colors.text,
      textAlignVertical: 'center',
      flex: 1,
      padding: 16,
      paddingTop: 16,
    },
    scrollView: {
      padding: 16,
      paddingBottom: 40,
    },
    icon: {
      width: 18,
      height: 18,
      marginRight: 8,
    },
    sendIcon: {
      width: 24,
      height: 24,
      transform: [
        {
          rotate: '45deg',
        },
      ],
    },
  });
