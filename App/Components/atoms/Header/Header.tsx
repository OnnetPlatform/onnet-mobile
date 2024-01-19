import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '../Icon';
import Text from '../Text';
import { withColors } from './styles';

export const Header: React.FC<{
  title: string;
  hide?: SharedValue<number>;
}> = ({ title, hide }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = withColors(colors, insets);
  const navigation = useNavigation();
  const hiddenValue = useSharedValue(1);
  const headerHeight = useSharedValue(0);
  const hiddenStyle = useAnimatedStyle(
    () => ({
      marginTop: interpolate(
        hiddenValue.value,
        [0, 1],
        [-headerHeight.value, 0]
      ),
    }),
    [hide]
  );

  useAnimatedReaction(
    () => (hide ? hide.value : 1),
    (result) => (hiddenValue.value = withTiming(result, { duration: 300 })),
    [hide]
  );

  const onArrowPressed = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <Animated.View
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => (headerHeight.value = height)}
      style={[styles.header, hiddenStyle]}>
      <View style={styles.row}>
        <Pressable onPress={onArrowPressed} style={styles.element}>
          <Icon name={'arrow-ios-back-outline'} />
        </Pressable>
        <Text fontSize={18} weight="bold" style={styles.title}>
          {title}
        </Text>
        <View style={styles.element} />
      </View>
    </Animated.View>
  );
};

export default Header;
