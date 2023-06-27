import {
  BackdropBlur,
  Canvas,
  Circle,
  Easing,
  Rect,
  SweepGradient,
  runSpring,
  runTiming,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { blue, cyan, pink, yellow } from '../../../Theme/Colors';
import { useColors } from '../../../Theme';

export const Timer: React.FC = () => {
  const { height, width } = useWindowDimensions();
  const start = useValue(0);
  const end = useValue(0);
  const colors = useColors();
  useEffect(() => {
    runTiming(
      start,
      { to: 360, loop: true, yoyo: true },
      { duration: 100000, easing: Easing.linear }
    );
    runSpring(end, { from: 0, to: 380, loop: true, yoyo: true }, { velocity: 0.1, damping: 50 });
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Rect width={width} height={height}>
        <SweepGradient
          end={end}
          start={start}
          c={vec(width / 2, height / 2)}
          colors={[colors.blue, colors.cyan, colors.pink, colors.blue]}
        />
      </Rect>
      <BackdropBlur blur={100} />
    </Canvas>
  );
};
