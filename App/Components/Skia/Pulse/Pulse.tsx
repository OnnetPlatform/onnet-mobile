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

const RADIUS = 100;

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
        three.value = previousValue + 10;
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
        width: RADIUS,
        height: RADIUS,
        borderRadius: RADIUS / 2,
        overflow: 'hidden',
        position: 'absolute',
      }}>
      <Circle cx={RADIUS / 2} cy={RADIUS / 2} r={200} color={'transparent'} />
      <Circle cx={RADIUS / 2} cy={RADIUS / 2} r={four} color={colors.cyan} />
      <Circle cx={RADIUS / 2} cy={RADIUS / 2} r={three} color={colors.pink} />
      <Circle cx={RADIUS / 2} cy={RADIUS / 2} r={two} color={colors.blue} />
      <Circle cx={RADIUS / 2} cy={RADIUS / 2} r={one} color={colors.text} />
      <BackdropBlur blur={10} />
      <Circle
        cx={RADIUS / 2}
        cy={RADIUS / 2}
        r={one}
        color={colors.background}
      />
    </Canvas>
  );
};

export default Pulse;
