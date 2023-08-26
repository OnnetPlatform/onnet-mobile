import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../../Theme/Colors';

export default StyleSheet.create({
  time: {
    marginBottom: 8,
    opacity: 0.8,
  },
  itemWrapper: {
    padding: 16,
  },
  joinedUsersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedUserWrapper: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    lineHeight: 8,
    marginHorizontal: 4,
  },
  joinButton: {
    alignItems: 'flex-end',
  },
  joinButtonContent: {
    marginTop: 0,
    marginVertical: 0,
  },
});

export const withColors = (colors: ThemeColors) =>
  StyleSheet.create({
    itemWrapper: {
      // backgroundColor: colors.secondaryBackground,
      overflow: 'hidden',
      paddingHorizontal: 12,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
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
    dash: {
      width: 16,
      height: 2,
      backgroundColor: colors.text,
    },
  });
