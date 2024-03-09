import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  messageContainer: {
    marginLeft: 12,
    paddingHorizontal: 22,
    overflow: 'visible',
  },
  stickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  stickersList: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 11,
    padding: 11,
    borderRadius: 40,
  },
});
