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
  });
}
