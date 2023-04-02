import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../../../../Theme';
import styles from '../../UserChatScreen.styles';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const TypingIndicator = React.memo(
  () => {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const withColors = styles(colors, insets);
    return (
      <View style={withColors.handleWrapper}>
        <View style={withColors.handleIndicator} />
        <View style={withColors.typingWrapper}>
          <Animated.Text
            entering={FadeIn.duration(1000)}
            exiting={FadeOut.duration(1000)}
            style={withColors.typingText}>
            Someone is typing...
          </Animated.Text>
        </View>
      </View>
    );
  },
  () => true
);

export default TypingIndicator;
