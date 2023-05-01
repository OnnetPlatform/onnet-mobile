import React, { useEffect } from 'react';
import {
  Canvas,
  vec,
  Rect,
  SweepGradient,
  BackdropBlur,
  RadialGradient,
} from '@shopify/react-native-skia';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useColors } from '../../../Theme';
import {
  Easing,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default () => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  const start = useSharedValue(0);
  const skValue = useSharedValue(0);

  const backgroud = useDerivedValue(() =>
    interpolateColor(skValue.value, [0, 1], [colors.background, colors.secondaryBackground])
  );
  const blue = useDerivedValue(
    () => interpolateColor(skValue.value, [0, 1], [colors.cyan, colors.blue]),
    [skValue]
  );

  const pink = useDerivedValue(
    () => interpolateColor(skValue.value, [0, 1], [colors.pink, colors.yellow]),
    [skValue]
  );
  const yellow = useDerivedValue(
    () => interpolateColor(skValue.value, [0, 0.5, 1], [colors.yellow, colors.pink, colors.cyan]),
    [skValue]
  );

  const gradientColors = useDerivedValue(
    () => [
      backgroud.value,
      yellow.value,
      pink.value,
      blue.value,
      backgroud.value,
      backgroud.value,
      backgroud.value,
    ],
    [blue, pink, yellow, backgroud]
  );

  const radialYellow = useDerivedValue(
    () => interpolateColor(skValue.value, [0, 1], [colors.pink, colors.cyan]),
    [skValue]
  );

  const radialCyan = useDerivedValue(
    () => interpolateColor(skValue.value, [0, 1], [colors.cyan, colors.pink]),
    [skValue]
  );
  const radialPink = useDerivedValue(
    () => interpolateColor(skValue.value, [0, 0.5, 1], [colors.pink, colors.yellow, colors.cyan]),
    [skValue]
  );

  const radialGradient = useDerivedValue(
    () => [radialYellow.value, radialCyan.value, radialPink.value, colors.background],
    [radialCyan, radialPink, radialYellow]
  );

  useEffect(() => {
    skValue.value = withRepeat(withTiming(1, { duration: 10000, easing: Easing.linear }), -1, true);
  }, []);
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <SweepGradient start={start} c={vec(width / 2, height * 0.75)} colors={gradientColors} />
      </Rect>
      <Rect x={height / 2} y={0} width={width} height={height}>
        <RadialGradient
          colors={radialGradient}
          c={vec(width / 2, height + width / 4)}
          r={width / 2}
        />
      </Rect>
      <BackdropBlur blendMode={'overlay'} blur={100} />
    </Canvas>
  );
};
