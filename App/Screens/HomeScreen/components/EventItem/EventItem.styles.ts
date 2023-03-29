import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../../Theme/Colors';

export default StyleSheet.create({
  time: {
    marginBottom: 8,
    opacity: 0.8,
    marginTop: 16,
  },
  joinedUsersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  joinedUserWrapper: {
    width: 24,
    height: 24,
    borderRadius: 32,
    overflow: 'hidden',
  },
  joinedUserAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    flex: 1,
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    date: {
      width: 44,
      height: 44,
      backgroundColor: colors.background,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    joinButton: {
      paddingHorizontal: 22,
      marginTop: 22,
      height: 36,
      justifyContent: 'center',
      backgroundColor: colors.blur,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.cyan,
    },
  });
