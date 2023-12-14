import {
  BackdropBlur,
  Canvas,
  Circle,
  Rect,
  Turbulence,
} from '@shopify/react-native-skia';
import { useColors } from '@Theme';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

export const GradientCard: React.FC = () => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Circle
        r={height}
        cx={width / 2}
        cy={height / 2}
        color={colors.background}
      />
      <Circle r={256} cx={0} cy={height} color={colors.cyan} />
      <Circle r={256} cx={0} cy={0} color={'pink'} />
      <Circle r={256} cx={width} cy={height / 2} color={colors.blue} />
      <BackdropBlur blur={100} blendMode={'overlay'} />
      <Rect x={0} y={0} width={width} height={height}>
        <Turbulence freqX={1} freqY={1} octaves={1} seed={1} />
      </Rect>
    </Canvas>
  );
};
