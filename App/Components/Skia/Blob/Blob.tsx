import {
  BackdropBlur,
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  Rect,
  useClockValue,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
// @ts-ignore
import { useColors } from '../../../Theme';
import { computeNoise } from '../Gradient/utils';

export const Blob: React.FC = () => {
  const clock = useClockValue();
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  const circle_1 = useValue(0);
  const circle_2 = useValue(width);
  const circle_radius_3 = useValue(50);
  const circle_3 = useValue(height * 0.7);

  const circleNoise1 = useComputedValue(() => computeNoise(circle_1, width, 0.0005), [clock]);
  const circleNoise2 = useComputedValue(() => computeNoise(circle_2, width, 0.002), [clock]);
  const circleNoise3 = useComputedValue(() => computeNoise(circle_radius_3, 100, 0.001), [clock]);
  const circleNoise4 = useComputedValue(() => computeNoise(circle_3, height, 0.001), [clock]);
  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Rect width={width} height={height} color={colors.background}></Rect>
      <Group
        layer={
          <Paint>
            <Blur blur={20} />
            <ColorMatrix matrix={[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 18, -7]} />
          </Paint>
        }>
        <Circle color={colors.background} cx={circleNoise1} cy={0} r={width * 0.9} />
        <Circle color={colors.blue} cx={circleNoise2} cy={height / 2} r={width * 0.4} />
        <Circle color={colors.cyan} cx={width} cy={height - 100} r={circleNoise3} />
        <Circle color={colors.blue} cx={circleNoise4} cy={circleNoise4} r={width * 0.2} />
        <Circle color={colors.yellow} cx={width * 0.48} cy={height * 0.8} r={circleNoise3} />
      </Group>
      <BackdropBlur blur={100} blendMode={'overlay'} />
    </Canvas>
  );
};
