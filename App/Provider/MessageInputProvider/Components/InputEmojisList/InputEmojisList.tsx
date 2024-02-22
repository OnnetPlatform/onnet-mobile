import Separator from '@Atoms/Separator';
import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';
import { EmojiList } from '@Molecules/EmojiList/EmojiList';
import { Emoji } from '@Molecules/EmojiList/types';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const InputEmojisList: React.FC = () => {
  const { openEmojisList, setTextMessage } = useMessageInputContext();
  const onEmojiPressed = (item: Emoji) => {
    setTextMessage((text) => text + item.emoji);
  };

  if (openEmojisList)
    return (
      <>
        <Separator size={'md'} />
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <EmojiList onEmojiPressed={onEmojiPressed} />
        </Animated.View>
      </>
    );

  return null;
};

export default InputEmojisList;
