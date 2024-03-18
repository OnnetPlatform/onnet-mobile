import { useColors } from '@Theme/index';
import {
  Canvas,
  LinearGradient,
  Mask,
  Points,
  Rect,
  vec,
  useVectorInterpolation,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const Loading: React.FC = () => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  const points = [vec(40, height / 2), vec(width - 40, height / 2)];
  const value = useSharedValue(0);
  const position = useVectorInterpolation(
    value,
    [0, 1],
    [vec(-width, width), vec(width, width)]
  );
  useEffect(() => {
    value.value = withRepeat(withTiming(2, { duration: 1500 }), -1, true);
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Mask
        mask={
          <Points
            points={points}
            mode="lines"
            color="lightblue"
            style="stroke"
            strokeWidth={3}
          />
        }>
        <Rect width={width - 80} height={3} x={40} y={height / 2}>
          <LinearGradient
            colors={[colors.pink, colors.cyan, colors.pink]}
            start={vec(0, 0)}
            end={position}
          />
        </Rect>
      </Mask>
      <LinearGradient
        colors={[colors.pink, colors.cyan, colors.pink]}
        start={vec(0, 0)}
        end={position}
      />
    </Canvas>
  );
};
