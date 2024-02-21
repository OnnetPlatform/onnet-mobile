import { useColors } from '@Theme';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import styles from '../../UserChatScreen.styles';
import User from '@Khayat/Database/Models/User';

export const TypingIndicator: React.FC<{ opponent: User }> = React.memo(
  ({ opponent }) => {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const withColors = styles(colors, insets);
    const { getUser } = useRealmUsers();
    const opacity = useSharedValue(0);
    const localUser = getUser(opponent);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    useEffect(() => {
      opacity.value = withTiming(localUser?.status ? 1 : 0, { duration: 500 });
    }, [localUser, localUser?.status]);

    return (
      <View style={withColors.handleWrapper}>
        <View style={withColors.handleIndicator} />
        <View style={withColors.typingWrapper}>
          <Animated.Text style={[withColors.typingText, animatedStyle]}>
            typing...
          </Animated.Text>
        </View>
      </View>
    );
  }
);

export default TypingIndicator;
