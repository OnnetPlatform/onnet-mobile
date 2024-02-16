import {
  BackdropBlur,
  Canvas,
  Rect,
  SweepGradient,
  useClock,
  useDerivedValueOnJS,
  vec,
} from '@shopify/react-native-skia';
import { useColors } from '@Theme';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

// @ts-ignore
import { computeNoise } from './utils';
import { useSharedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export const Gradient: React.FC = () => {
  const clock = useClock();
  const hueNoiseOffset = useSharedValue(0);
  const colors = useColors();

  const colorNoise = useDerivedValueOnJS(
    () => computeNoise(hueNoiseOffset, 360),
    [clock]
  );

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <SweepGradient
          end={colorNoise}
          start={0}
          c={vec(width / 2, height * 0.75)}
          colors={[
            colors.background,
            colors.yellow,
            colors.pink,
            colors.cyan,
            colors.blue,
            colors.yellow,
            colors.background,
            colors.background,
          ]}
        />
      </Rect>

      <BackdropBlur blur={300} blendMode={'overlay'} />
    </Canvas>
  );
};

export default Gradient;
