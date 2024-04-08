import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';
import { useKeyboard } from '@Hooks/useKeyboard';
import { BOTTOM_BAR_HEIGHT, useColors } from '@Theme/index';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React from 'react';
import { Keyboard, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const InputBackdrop: React.FC<BottomSheetBackdropProps> = (props) => {
  const { toggleEmojisList, toggleMentionsList } = useMessageInputContext();
  const { height } = useWindowDimensions();
  const colors = useColors();
  const { state } = useAnimatedKeyboard();
  const { isOpen } = useKeyboard();
  const onClose = () => {
    if (state.value === 2) return Keyboard.dismiss();
    toggleEmojisList(false);
    toggleMentionsList(false);
  };
  const animatedBackground = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    opacity: interpolate(
      props.animatedPosition.value,
      [height - BOTTOM_BAR_HEIGHT - 20, height / 2],
      [0, 0.1]
    ),
    backgroundColor: colors.black,
  }));

  return (
    <Animated.View
      {...props}
      pointerEvents={isOpen ? 'auto' : 'none'}
      onTouchStart={onClose}
      style={animatedBackground}
    />
  );
};

export default InputBackdrop;
