import React, { useEffect } from 'react';
import Animated, {
  measure,
  runOnUI,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { Text } from '../@Atoms';

const AnimatedHorizontalHeader: React.FC<{
  scrollValue: SharedValue<number>;
}> = (props) => {
  const position = useSharedValue<number>(0);
  const ref = useAnimatedRef<Animated.View>();
  const width = useSharedValue<number>(0);
  const pageX = useSharedValue<number>(0);
  const { scrollValue } = props;
  const x = useDerivedValue(() =>
    scrollValue.value < -width.value + pageX.value ? 0 : scrollValue.value
  );

  useAnimatedReaction(
    () => scrollValue,
    (value) => (position.value = value.value)
  );
  const measureHeader = () =>
    runOnUI(() => {
      'worklet';
      const edges = measure(ref);
      pageX.value = edges.pageX;
      width.value = edges.width;
    })();

  useEffect(() => {
    measureHeader();
  }, [ref]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <Animated.View style={animatedStyle} ref={ref}>
      <Text>Header</Text>
    </Animated.View>
  );
};

export default AnimatedHorizontalHeader;
