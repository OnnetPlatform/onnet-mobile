import {
  BackdropBlur,
  Canvas,
  Rect,
  SweepGradient,
  useClockValue,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
// @ts-ignore
import { computeNoise, map } from './utils';
import { useColors } from '../../../Theme';

const { width, height } = Dimensions.get('window');

export const Gradient: React.FC = () => {
  const clock = useClockValue();
  const hueNoiseOffset = useValue(0);
  const colors = useColors();

  const colorNoise = useComputedValue(() => computeNoise(hueNoiseOffset, 360), [clock]);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <SweepGradient
          end={colorNoise}
          start={0}
          c={vec(width / 2, height * 0.75)}
          colors={[
            colors.background,
            colors.yellow,
            colors.pink,
            colors.cyan,
            colors.blue,
            colors.yellow,
            colors.background,
            colors.background,
          ]}
        />
      </Rect>

      <BackdropBlur blur={300} blendMode={'overlay'} />
    </Canvas>
  );
};

export default Gradient;
