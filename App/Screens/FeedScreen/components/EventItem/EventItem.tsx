import { Story } from '@Molecules/Story/Story';
import type { Story as StoryType } from '@Molecules/Story/types';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import React, { useEffect, useRef } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import styles from './EventItem.styles';

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
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

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
        ['transparent', colors.secondaryBackground, 'transparent']
      ),
    }),
    [isFocused, width, colors.secondaryBackground]
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
      <Pressable
        onPress={() => {
          navigation.navigate('LiveAnnouncement');
        }}>
        <Animated.View>
          <Story data={data} isFocused={isFocused} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default EventItem;
