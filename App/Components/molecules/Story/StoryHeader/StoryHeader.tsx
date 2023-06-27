import React from 'react';
import { View } from 'react-native';
import { StoryIndicator } from '../StoryIndicator/StoryIndicator';
import { StoryHeaderProps } from './types';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const StoryHeader: React.FC<StoryHeaderProps> = ({
  currentIndex,
  onEnd,
  isFocused,
  storiesLength,
}) => {
  const data = Array.from({ length: storiesLength }, (_, i) => i);

  const StorySeparator = ({ index }: { index: number }) =>
    index > 0 && index < data.length ? <View style={{ width: 4 }} /> : null;
  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(Number(isFocused.value), { duration: 1000 }),
    }),
    []
  );

  return (
    <Animated.View style={animatedStyle}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {data.map((item) => (
          <>
            <StorySeparator index={item} key={item} />
            <StoryIndicator
              key={item + 10}
              index={item}
              currentIndex={currentIndex}
              onEnd={onEnd}
              isFocused={isFocused}
            />
          </>
        ))}
      </View>
    </Animated.View>
  );
};
export default StoryHeader;
