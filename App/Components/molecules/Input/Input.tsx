/* eslint-disable react-native/no-inline-styles */
import { useColors } from '@Theme';
import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

/** @deprecated */
const Input: React.FC<TextInputProps> = (props) => {
  const sharedValue = useSharedValue(0);
  const colors = useColors();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputMetrics, setInputMetrics] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: 2,
      alignSelf: 'flex-end',
      width: sharedValue.value,
    }),
    [sharedValue.value]
  );

  const reversedAnimatedStyle = useAnimatedStyle(() => ({
    height: 2,
    alignSelf: 'flex-end',
    width: inputMetrics.width - sharedValue.value,
    backgroundColor: colors.text,
  }));

  const animatedLGStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.blur,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  }));

  useEffect(() => {
    sharedValue.value = withTiming(isFocused ? inputMetrics.width : 0);
  }, [isFocused, inputMetrics]);

  return (
    <Animated.View
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => setInputMetrics({ width, height })}
      style={[animatedLGStyle]}>
      <TextInput
        placeholder="Phone"
        onFocus={() => setIsFocused(true)}
        placeholderTextColor={colors.text}
        onBlur={() => setIsFocused(false)}
        {...props}
        style={[{ padding: 16, color: colors.text }, props.style]}
      />
      <View style={{ flexDirection: 'row' }}>
        <AnimatedLinearGradient
          colors={[colors.cyan, colors.pink]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={animatedStyle}
        />
        <Animated.View style={reversedAnimatedStyle} />
      </View>
    </Animated.View>
  );
};

export default Input;
