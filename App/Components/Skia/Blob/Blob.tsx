import { useColors } from '@Theme/index';
import {
  BackdropBlur,
  Canvas,
  Rect,
  vec,
  RadialGradient,
  Blend,
  Turbulence,
  Circle,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

export const Blob: React.FC = () => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Circle cx={0} r={height} cy={0} color={colors.background} />
      <Circle
        cx={width / 2}
        r={height}
        cy={height / 2}
        color={colors.background}
      />
      <Circle cx={0} r={70} cy={height / 2} color={colors.text} />
      <Circle cx={width} r={50} cy={height} color={colors.cyan} />
      <Circle cx={width} r={50} cy={0} color={colors.text} />
      <BackdropBlur blur={100} blendMode={'overlay'} />

      <Rect width={width} height={height}>
        <Blend mode={'dstIn'}>
          <RadialGradient
            colors={[colors.background, colors.text]}
            r={6}
            c={vec(0, 0)}
            mode={'repeat'}
          />
          <Turbulence freqX={1} freqY={1} octaves={1} />
        </Blend>
      </Rect>
    </Canvas>
  );
};
