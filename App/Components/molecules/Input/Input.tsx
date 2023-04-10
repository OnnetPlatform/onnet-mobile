import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useColors } from '../../../Theme';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Input: React.FC<TextInputProps> = (props) => {
  const sharedValue = useSharedValue(0);
  const colors = useColors();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputMetrics, setInputMetrics] = useState<{ width: number }>({ width: 0 });

  const animatedStyle = useAnimatedStyle(() => ({
    height: 3,
    alignSelf: 'flex-start',
    width: sharedValue.value,
  }));

  const reversedAnimatedStyle = useAnimatedStyle(() => ({
    height: 3,
    alignSelf: 'flex-end',
    width: inputMetrics.width - sharedValue.value,
    backgroundColor: colors.text,
  }));

  const animatedLGStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.blur,
    borderRadius: 8,
    overflow: 'hidden',
  }));

  useEffect(() => {
    sharedValue.value = withTiming(isFocused ? inputMetrics.width : 0);
  }, [isFocused, inputMetrics]);

  return (
    <>
      <Animated.View
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => setInputMetrics({ width })}
        style={[animatedLGStyle, props.style]}>
        <TextInput
          placeholder="Phone"
          onFocus={() => setIsFocused(true)}
          placeholderTextColor={colors.text}
          onBlur={() => setIsFocused(false)}
          {...props}
          style={[{ padding: 16, color: colors.text }]}
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
    </>
  );
};

export default Input;
