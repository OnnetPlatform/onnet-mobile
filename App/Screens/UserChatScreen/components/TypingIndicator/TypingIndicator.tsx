import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../../../../Theme';
import styles from '../../UserChatScreen.styles';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import useChatEvents from '../../../../Hooks/useChatEvents';
import { useSocketContext } from '../../../../Context/SocketContext/SocketContext';

export const TypingIndicator: React.FC = React.memo(() => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const withColors = styles(colors, insets);
  const [typing, setTyping] = useState<boolean>(false);
  const opacity = useSharedValue(0);
  const { opponent } = useSocketContext();
  useChatEvents(
    {
      onUserTyping: (data) => {
        console.log(opponent);
        if (data.id === opponent?.id) setTyping(true);
      },
      onUserStoppedTyping: (data) => {
        if (data.id === opponent?.id) setTyping(false);
      },
    },
    [opponent]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(typing ? 1 : 0, { duration: 500 });
  }, [typing]);

  return (
    <View style={withColors.handleWrapper}>
      <View style={withColors.handleIndicator} />
      <View style={withColors.typingWrapper}>
        <Animated.Text style={[withColors.typingText, animatedStyle]}>typing...</Animated.Text>
      </View>
    </View>
  );
});

export default TypingIndicator;
