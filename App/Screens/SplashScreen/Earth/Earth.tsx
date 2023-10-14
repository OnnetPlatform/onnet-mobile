import React, {useMemo} from 'react';

import {
  BackdropBlur,
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Fill,
  Group,
  Paint,
  Rect,
  Shader,
  Skia,
  SweepGradient,
  useClockValue,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {blue, cyan, pink, turquoise} from '@Theme/Colors';
import Moon from '../Moon/Moon';
import {useColors} from '@Theme';
const source = Skia.RuntimeEffect.Make(`
vec4 main(vec2 pos) {
  // normalized x,y values go from 0 to 1, the canvas is 256x256
  vec2 normalized = pos/vec2(256);
  return vec4(normalized.x, normalized.y, 0.5, 1);
}`)!;

export const Earth: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const colors = useColors();
  return (
    <Canvas style={[StyleSheet.absoluteFillObject]}>
      <Rect width={width} height={height}>
        <SweepGradient
          c={vec(width / 2, height / 2)}
          colors={[colors.pink, colors.cyan, colors.background]}
        />
      </Rect>
      <BackdropBlur blendMode={'overlay'} blur={100} />
      <Circle
        r={100}
        cx={width / 2}
        cy={height / 2}
        color={colors.blue}></Circle>
      <Moon />
    </Canvas>
  );
};

export default Earth;
