import { ThemeColors } from '@Theme/Colors';
import { StyleSheet } from 'react-native';

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
  circleIndicator: {
    height: 8,
    width: 8,
    backgroundColor: 'white',
    position: 'absolute',
    left: 9,
    borderRadius: 8,
    zIndex: 100,
  },
  mt8: {
    marginTop: 8,
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
    pastBackground: {
      width: '100%',
      height: 200,
      position: 'absolute',
      tintColor: colors.text,
      opacity: 0.2,
    },
    borderLeft: {
      borderLeftWidth: 2,
      borderLeftColor: colors.text,
    },
    avatar: {
      marginRight: 0,
      borderWidth: 2,
      borderColor: colors.background,
    },
    joinedUsersContainer: {
      paddingHorizontal: 38,
      backgroundColor: colors.background,
      paddingVertical: 16,
      borderLeftColor: colors.cyan,
      borderLeftWidth: 2,
    },
  });

export const pastBackground = (isPast: boolean, colors: ThemeColors) => {
  return {
    backgroundColor: isPast ? 'transparent' : colors.secondaryBackground,
  };
};
