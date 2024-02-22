import { useColors } from '@Theme/index';
import {
  Canvas,
  Circle,
  Fill,
  FractalNoise,
  Rect,
  useClock,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

export const TVNoise: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  const clock = useClock();
  const freqX = useDerivedValue(() => clock.value / 100);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Fill color={colors.background} />
      <Rect x={0} y={0} width={width} height={height}>
        <FractalNoise freqX={0.8} freqY={0.8} octaves={5} seed={freqX} />
      </Rect>
    </Canvas>
  );
};
