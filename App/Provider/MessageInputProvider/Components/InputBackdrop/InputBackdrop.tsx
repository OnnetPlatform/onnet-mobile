import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';
import { BOTTOM_BAR_HEIGHT, useColors } from '@Theme/index';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const InputBackdrop: React.FC<BottomSheetBackdropProps> = (props) => {
  const {
    openEmojisList,
    openMentionsList,
    toggleEmojisList,
    toggleMentionsList,
  } = useMessageInputContext();
  const { height } = useWindowDimensions();
  const colors = useColors();
  const onClose = () => {
    toggleEmojisList(false);
    toggleMentionsList(false);
  };
  const animatedBackground = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    opacity: interpolate(
      props.animatedPosition.value,
      [height - BOTTOM_BAR_HEIGHT - 20, height / 2],
      [0, 0.5]
    ),
    backgroundColor: colors.black,
  }));

  return (
    <Animated.View
      {...props}
      pointerEvents={openEmojisList || openMentionsList ? 'auto' : 'none'}
      onTouchStart={onClose}
      style={animatedBackground}
    />
  );
};

export default InputBackdrop;
