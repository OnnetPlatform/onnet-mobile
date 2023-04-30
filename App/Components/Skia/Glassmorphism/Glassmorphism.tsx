import {
  add,
  Canvas,
  LinearGradient,
  vec,
  sub,
  Fill,
  useLoop,
  mix,
  BackdropFilter,
  Blur,
  useComputedValue,
  Box,
  rrect,
  rect,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useColors } from '../../../Theme';

export const Glassmorphism: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  const c = vec(width / 2, 0);
  const r = c.x - 32;
  const rectClip = useMemo(() => ({ x: 0, y: 0, width, height }), [c.y, width, height]);

  const progress = useLoop({ duration: 2000 });
  const start = useComputedValue(() => sub(c, vec(0, mix(progress.current, r, r / 2))), [progress]);
  const end = useComputedValue(() => add(c, vec(0, mix(progress.current, r, r / 2))), []);
  const radius = useComputedValue(() => mix(progress.current, r, r / 2), [progress]);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Fill color={colors.blue} />
      <Box box={rrect(rect(0, 0, width, height), 0, 0)}>
        <LinearGradient start={start} end={end} colors={[colors.blur, colors.pink]} />
      </Box>
      <BackdropFilter filter={<Blur blur={10} />} clip={rectClip}>
        <Fill color="rgba(0, 0, 0, 0.1)" />
      </BackdropFilter>
    </Canvas>
  );
};

export default Glassmorphism;
