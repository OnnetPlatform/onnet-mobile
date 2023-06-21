import {
  Canvas,
  vec,
  Fill,
  BackdropFilter,
  Blur,
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
  const rectClip = useMemo(() => ({ x: 0, y: 0, width, height }), [c.y, width, height]);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Fill color={colors.pink} />
      <Box box={rrect(rect(0, 0, width, height / 2), 0, 0)} />
      <Fill color={colors.yellow} />
      <Box box={rrect(rect(0, 0, width, height / 2), 0, 0)} />
      <BackdropFilter filter={<Blur blur={10} />} clip={rectClip} />
    </Canvas>
  );
};

export default Glassmorphism;
