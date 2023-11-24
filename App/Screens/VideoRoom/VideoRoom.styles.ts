import { ThemeColors } from 'App/Theme/Colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  localStream: {
    backgroundColor: '#050A0E',
    width: 150,
    height: 200,
    margin: 22,
    top: 48,
    position: 'absolute',
    borderRadius: 16,
    right: 0,
    zIndex: 100,
    borderWidth: 2,
    borderColor: 'white',
  },

  remoteStream: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'red',
  },
});

export function alertStyle(colors: ThemeColors) {
  return StyleSheet.create({
    textCenter: {
      textAlign: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    itemsCenter: {
      alignItems: 'center',
    },
    separator: {
      marginLeft: 4,
    },
    buttonsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      paddingVertical: 16,
      paddingHorizontal: 22,
      backgroundColor: colors.text,
      borderRadius: 8,
    },
    // @ts-ignore
    avatar: (index) => ({
      width: 48,
      height: 48,
      borderRadius: 24,
      borderColor: colors.background,
      borderWidth: 1,
      marginLeft: index > 0 ? -16 : 0,
    }),
    // @ts-ignore
    avatarContainer: {
      alignSelf: 'center',
    },
  });
}
