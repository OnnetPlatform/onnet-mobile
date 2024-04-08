import React from 'react';
import { StyleSheet } from 'react-native';
import SendButton from '../SendButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';
import Separator from '@Atoms/Separator';
import { useStyles } from '@Theme/Colors';
import Blur from '@Atoms/Blur';

export const InputFooter: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { state } = useAnimatedKeyboard();
  const { textMessage } = useMessageInputContext();
  const { backgroundColor } = useStyles();
  const hiddenStyle = useAnimatedStyle(
    () => ({
      display: textMessage ? 'flex' : 'none',
    }),
    [textMessage]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: state.value === 2 ? 0 : insets.bottom / 2,
    };
  }, [insets, state, textMessage]);

  return (
    <Blur>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[animatedStyle]}>
        <Animated.View style={[hiddenStyle, styles.row]}>
          <Separator horizontal size={'md'} />
          <SendButton />
        </Animated.View>
      </Animated.View>
    </Blur>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 22,
    paddingVertical: 8,
    justifyContent: 'flex-end',
  },
});

export default InputFooter;
