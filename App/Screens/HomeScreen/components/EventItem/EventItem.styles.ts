import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  time: {
    marginBottom: 8,
    opacity: 0.8,
  },
  joinedUsersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  joinedUserWrapper: {
    width: 64,
    height: 64,
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
