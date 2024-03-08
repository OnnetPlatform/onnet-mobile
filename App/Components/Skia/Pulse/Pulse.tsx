import { useColors } from '@Theme/index';
import { BackdropBlur, Canvas, Circle } from '@shopify/react-native-skia';
import React from 'react';
import {
  SharedValue,
  interpolate,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const Pulse: React.FC<{ peak: SharedValue<number> }> = ({ peak }) => {
  const one = useDerivedValue(() =>
    interpolate(peak.value, [-160, 50], [0, 30])
  );
  const two = useSharedValue(0);
  const three = useSharedValue(0);
  const four = useSharedValue(0);

  const colors = useColors();

  useAnimatedReaction(
    () => one.value,
    (_, previousValue) => {
      if (previousValue !== null) {
        two.value = previousValue + 10;
      }
    }
  );
  useAnimatedReaction(
    () => two.value,
    (_, previousValue) => {
      if (previousValue !== null) {
        three.value = withSpring(previousValue + 10);
      }
    }
  );
  useAnimatedReaction(
    () => three.value,
    (_, previousValue) => {
      if (previousValue !== null) {
        four.value = withSpring(previousValue + 10);
      }
    }
  );

  return (
    <Canvas
      style={{
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        position: 'absolute',
      }}>
      <Circle cx={75} cy={75} r={200} color={'transparent'} />
      <Circle cx={75} cy={75} r={four} color={colors.cyan} />
      <Circle cx={75} cy={75} r={three} color={colors.pink} />
      <Circle cx={75} cy={75} r={two} color={colors.blue} />
      <Circle cx={75} cy={75} r={one} color={colors.text} />
      <BackdropBlur blur={10} />
      <Circle cx={75} cy={75} r={one} color={colors.background} />
    </Canvas>
  );
};

export default Pulse;
