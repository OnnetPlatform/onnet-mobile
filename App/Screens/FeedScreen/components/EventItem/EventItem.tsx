import React, { useEffect, useRef } from 'react';

import { Story } from '../../../../Components/molecules/Story/Story';
import { useColors } from '../../../../Theme';
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import styles from './EventItem.styles';
import type { Story as StoryType } from '../../../../Components/molecules/Story/types';
export const EventItem: React.FC<{
  headerHeight: number;
  scrollYOffset: SharedValue<number>;
  data: StoryType;
}> = ({ headerHeight, scrollYOffset, data }) => {
  const colors = useColors();
  const ref = useRef<Animated.View>(null);
  const offset = useSharedValue<number>(0);
  const y = useSharedValue(0);
  const storyHeight = useSharedValue(0);

  const isFocused = useDerivedValue(() => {
    const lowerBound = y.value - storyHeight.value / 2;
    const upperBound = y.value + storyHeight.value / 2;
    return offset.value >= lowerBound && offset.value < upperBound;
  }, [offset]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        offset.value,
        [y.value - storyHeight.value / 2, y.value, y.value + 100],
        ['transparent', colors.text, 'transparent']
      ),
    }),
    [isFocused]
  );

  useAnimatedReaction(
    () => scrollYOffset.value,
    (value) => (offset.value = value)
  );
  const measure = () => {
    ref.current?.measure((x, _, width, height, px, py) => {
      y.value = Math.round(py - headerHeight);
      storyHeight.value = height;
    });
  };
  useEffect(() => {
    if (ref.current) {
      setTimeout(measure);
    }
  }, [ref.current]);

  return (
    <Animated.View ref={ref} style={[styles.story, animatedStyle]}>
      <Story data={data} isFocused={isFocused} />
    </Animated.View>
  );
};

export default EventItem;
