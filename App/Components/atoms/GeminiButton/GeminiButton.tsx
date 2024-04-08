import StarsIcon from '@Icons/StarsIcon';
import { useStyles } from '@Theme/Colors';
import { useColors } from '@Theme/index';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Separator, Text } from '..';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Keyboard } from 'react-native-ui-lib';

export const GeminiButton: React.FC = () => {
  const colors = useColors();
  const { backgroundColor, borderColor } = useStyles();

  return (
    <Pressable
      style={[backgroundColor, styles.button, borderColor]}
      onPress={() => {
        console.log('aslknxask');
        Keyboard.KeyboardRegistry.requestShowKeyboard(
          'unicorn.InputEmojisList'
        );
      }}>
      <MaskedView maskElement={<StarsIcon />}>
        <LinearGradient
          style={{ width: 24, height: 24 }}
          colors={[colors.pink, colors.cyan]}
        />
      </MaskedView>
      <Separator horizontal />
      <Text weight="bold">Ask</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    alignSelf: 'flex-end',
  },
});

export default GeminiButton;
