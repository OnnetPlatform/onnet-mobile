import {
  BackdropBlur,
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  Rect,
  useClock,
  useDerivedValueOnJS,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useColors } from '@Theme';
import { computeNoise } from '../Gradient/utils';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

export const Blob: React.FC = () => {
  const clock = useClock();
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  const circle_2 = useSharedValue(width);
  const circle_radius_3 = useSharedValue(50);
  const circle_3 = useSharedValue(height * 0.7);

  const circleNoise2 = useDerivedValueOnJS(
    () => computeNoise(circle_2, width, 0.002),
    [clock.value]
  );
  const circleNoise3 = useDerivedValueOnJS(
    () => computeNoise(circle_radius_3, 100, 0.001),
    [clock.value]
  );
  const circleNoise4 = useDerivedValueOnJS(
    () => computeNoise(circle_3, height, 0.001),
    [clock.value]
  );

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Rect width={width} height={height} color={colors.background} />
      <Group
        layer={
          <Paint>
            <Blur blur={20} />
            <ColorMatrix
              matrix={[
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 18, -7,
              ]}
            />
          </Paint>
        }>
        <Circle
          color={colors.blue}
          cx={circleNoise2}
          cy={height / 2}
          r={width * 0.4}
        />
        <Circle
          color={colors.cyan}
          cx={width}
          cy={height - 100}
          r={circleNoise3}
        />
        <Circle
          color={colors.pink}
          cx={circleNoise4}
          cy={circleNoise4}
          r={width * 0.2}
        />
        <Circle
          color={colors.turquoise}
          cx={width * 0.48}
          cy={height * 0.8}
          r={circleNoise3}
        />
      </Group>
      <BackdropBlur blur={100} blendMode={'overlay'} />
    </Canvas>
  );
};
