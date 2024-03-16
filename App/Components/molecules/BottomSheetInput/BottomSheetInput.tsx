/* eslint-disable react-native/no-inline-styles */
import { useColors } from '@Theme';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const BottomSheetInput: React.FC<BottomSheetTextInputProps> = (props) => {
  const sharedValue = useSharedValue(0);
  const colors = useColors();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputMetrics, setInputMetrics] = useState<{ width: number }>({
    width: 0,
  });

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: 3,
      alignSelf: 'flex-start',
      width: sharedValue.value,
    }),
    [sharedValue.value]
  );

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
    <Animated.View
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setInputMetrics({ width })}
      style={[animatedLGStyle, props.style]}>
      <BottomSheetTextInput
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
  );
};

export default BottomSheetInput;
