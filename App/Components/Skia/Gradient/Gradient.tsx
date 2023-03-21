import React from 'react';
import { Canvas, vec, Rect, SweepGradient, BackdropBlur } from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useColors } from '../../../Theme';

export default () => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <SweepGradient
          c={vec(width / 2, height * 0.75)}
          colors={[
            colors.background,
            colors.yellow,
            colors.pink,
            colors.cyan,
            colors.blue,
            colors.background,
            colors.background,
            colors.background,
          ]}
        />
      </Rect>
      <BackdropBlur blendMode={'overlay'} blur={40} />
    </Canvas>
  );
};
