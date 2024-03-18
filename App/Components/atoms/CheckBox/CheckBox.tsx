import { useColors } from '@Theme/index';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '..';
export const CheckBox: React.FC<{
  isChecked: boolean;
  onChange(isChecked: boolean): void;
}> = ({ onChange, isChecked }) => {
  const colors = useColors();
  const checkValue = useSharedValue(0);

  const style: ViewStyle = useMemo(
    () => ({
      width: 24,
      height: 24,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.text,
    }),
    [colors]
  );

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        checkValue.value,
        [0, 1],
        [colors.background, colors.cyan]
      ),
      borderWidth: interpolate(checkValue.value, [0, 1], [2, 0]),
    }),
    [isChecked, colors]
  );

  const onPress = useCallback(() => {
    onChange(!isChecked);
  }, [isChecked]);

  useEffect(() => {
    checkValue.value = withTiming(isChecked ? 1 : 0, { duration: 500 });
  }, [isChecked]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[animatedStyle, style]}>
        {isChecked ? (
          <Icon name={'checkmark'} style={{ width: 18 }} fill={'black'} />
        ) : null}
      </Animated.View>
    </Pressable>
  );
};
export default CheckBox;
