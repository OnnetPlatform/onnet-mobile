import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const StoryIndicator: React.FC<{
  currentIndex: number;
  index: number;
  isFocused: SharedValue<boolean>;
  onEnd: () => void;
}> = ({ index, currentIndex, onEnd, isFocused }) => {
  const progress = useSharedValue(0);
  const [width, setWidth] = useState(0);
  const canRunAnimation = useSharedValue(false);
  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setWidth(layout.width);
    },
    [currentIndex]
  );

  const animateIndicators = () => {
    progress.value = 0;
    if (index < currentIndex) {
      progress.value = width;
    } else if (index === currentIndex) {
      progress.value = withTiming(width, { duration: 10000 }, (isFinised) => {
        if (isFinised) {
          runOnJS(onEnd)();
        }
      });
    } else {
      progress.value = 0;
    }
  };
  useAnimatedReaction(
    () => isFocused.value,
    (value) => {
      if (!value) {
        progress.value = 0;
      } else if (value && progress.value === 0) {
        runOnJS(animateIndicators)();
      }
    }
  );

  useEffect(() => {
    animateIndicators();
  }, [width, index, currentIndex]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      width: progress.value,
    }),
    [currentIndex, canRunAnimation]
  );

  return (
    <View
      onLayout={onLayout}
      style={{
        height: 4,
        backgroundColor: 'rgba(255,255,255,.4)',
        flex: 1,
        borderRadius: 4,
        overflow: 'hidden',
      }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 4,
            backgroundColor: 'rgba(255,255,255,1)',
            borderRadius: 4,
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};
