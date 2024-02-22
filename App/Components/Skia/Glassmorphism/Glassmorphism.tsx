import {
  Canvas,
  Circle,
  interpolateColors,
  Rect,
  Turbulence,
  useDerivedValueOnJS,
} from '@shopify/react-native-skia';
import { useColors } from '@Theme';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  runOnJS,
  SharedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const Glassmorphism: React.FC<{
  step: number;
  onAnimationEnd(): void;
}> = ({ step, onAnimationEnd }) => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  const damping = { damping: 100 };
  const blue_circle_radius = useSharedValue<number>(256);
  const yellow_circle_radius = useSharedValue<number>(256);
  const white_circle_radius = useSharedValue(200);
  const yellow_circle_x = useSharedValue(0);
  const yellow_circle_y = useSharedValue(height);

  const white_circle_x = useSharedValue<number>(width);
  const white_circle_y = useSharedValue<number>(height / 2);
  const blue_circle_x = useSharedValue<number>(width);
  const blue_circle_y = useSharedValue<number>(0);

  const octaves = useSharedValue(1);

  const runSpring = (value: SharedValue, to: { to: number }, config?: any) => {
    value.value = withSpring(to.to, config);
  };

  const color = useDerivedValueOnJS(
    () =>
      interpolateColors(
        white_circle_radius.value,
        [0, 200, 300, width],
        [colors.yellow, colors.white, colors.black, colors.white]
      ),
    [white_circle_radius]
  );
  useEffect(() => {
    if (step === 1) {
      white_circle_x.value = withSpring(width - (step * width) / 2);
      octaves.value = withSpring(0);
      blue_circle_x.value = withSpring(width / 2);
      yellow_circle_x.value = withSpring(width / 2);
      blue_circle_radius.value = withSpring(0);
      yellow_circle_radius.value = withSpring(0);
      setTimeout(() => {
        white_circle_radius.value = withSpring(0, undefined, (isFinished) => {
          if (isFinished) {
            white_circle_radius.value = withSpring(width * 2, undefined, () => {
              blue_circle_radius.value = withSpring(width * 2);
              yellow_circle_radius.value = withSpring(height * 0.7);
              white_circle_radius.value = withSpring(0, { damping: 40 });
              runOnJS(onAnimationEnd)();
            });
          }
        });
      }, 700);
    } else if (step === 2) {
      runSpring(yellow_circle_radius, { to: height * 2 }, damping);
      runSpring(white_circle_radius, { to: 0 }, damping);
      runSpring(white_circle_x, { to: 0 }, damping);
      runSpring(white_circle_y, { to: 0 }, damping);
      runSpring(white_circle_radius, { to: 300 }, damping);
      runSpring(white_circle_x, { to: 0 }, damping);
      octaves.value = 2;
      runOnJS(onAnimationEnd)();
    } else if (step === 3) {
      runSpring(white_circle_y, { to: 0 }, damping);
      runSpring(white_circle_x, { to: 0 }, damping);
      runSpring(white_circle_radius, { to: width }, damping);

      runSpring(blue_circle_radius, { to: width * 2 }, damping);
      runSpring(blue_circle_x, { to: -width / 2 }, damping);
      runSpring(blue_circle_y, { to: height / 2 }, damping);

      runSpring(yellow_circle_radius, { to: width }, damping);
      runSpring(yellow_circle_x, { to: width }, damping);
      runSpring(yellow_circle_y, { to: height }, damping);
      runOnJS(onAnimationEnd)();
    } else {
      runSpring(blue_circle_x, { to: 0 });
      runSpring(yellow_circle_x, { to: 0 });
      runSpring(blue_circle_radius, { to: 256 });
      runSpring(yellow_circle_radius, { to: 256 });
      runSpring(white_circle_radius, { to: 200 });
      octaves.value = 1;
    }
  }, [step]);
  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Circle r={2} cx={width - 80} cy={100} color={colors.text} />
      <Circle r={2} cx={70} cy={height / 2} color={colors.text} />
      <Circle
        r={blue_circle_radius}
        cx={blue_circle_x}
        cy={blue_circle_y}
        color={colors.blue}
      />
      <Circle
        r={yellow_circle_radius}
        cx={yellow_circle_x}
        cy={yellow_circle_y}
        color={colors.yellow}
      />
      <Circle
        r={white_circle_radius}
        cx={white_circle_x}
        cy={white_circle_y}
        color={color}
      />

      <Rect x={0} y={0} width={width} height={height}>
        <Turbulence freqX={1} freqY={1} octaves={octaves} seed={2} />
      </Rect>
    </Canvas>
  );
};

export default Glassmorphism;
