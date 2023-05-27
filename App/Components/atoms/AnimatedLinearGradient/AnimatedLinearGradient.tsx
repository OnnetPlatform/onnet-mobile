import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, View } from 'react-native';
import { Text } from '..';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
export const AnimatedLinearGradient: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const expandedValue = useSharedValue<number>(0);

  const color2 = useDerivedValue(() =>
    interpolateColor(expandedValue.value, [0, 5, 10], ['#00ff00', '#ff0000', '#000000'])
  );
  const color1 = useDerivedValue(() =>
    interpolateColor(expandedValue.value, [0, 5, 10], ['#ff0000', '#0000ff', '#001000'])
  );
  const colors = useDerivedValue(() => [color2.value, color1.value]);

  useEffect(() => {
    expandedValue.value = withTiming(expanded ? 10 : 1, { duration: 1000 });
  }, [expanded]);

  return (
    <AnimatedLG colors={[]} animatedProps={{ colors }}>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <Text>Press me</Text>
      </Pressable>
      <View style={{ height: 100 }}></View>
    </AnimatedLG>
  );
};
