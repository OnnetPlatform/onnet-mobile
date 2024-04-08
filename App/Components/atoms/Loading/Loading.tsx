import { useColors } from '@Theme/index';
import {
  Canvas,
  LinearGradient,
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

export const Loader: React.FC = () => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  const value = useSharedValue(0);
  const position = useVectorInterpolation(
    value,
    [0, 1],
    [vec(width / 2, 0), vec(-width, 0)]
  );
  const start = useVectorInterpolation(
    value,
    [0, 1],
    [vec(width / 2, 0), vec(width * 2, 0)]
  );
  useEffect(() => {
    value.value = 0;
    value.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect width={width - 44} height={1} x={22} y={height / 2}>
        <LinearGradient
          colors={['transparent', colors.text, 'transparent']}
          start={start}
          end={position}
        />
      </Rect>
    </Canvas>
  );
};
export default Loader;
