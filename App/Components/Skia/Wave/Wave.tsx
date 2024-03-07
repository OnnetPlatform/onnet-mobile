import React from 'react';
import {
  Canvas,
  LinearGradient,
  vec,
  Rect,
  Blend,
  FractalNoise,
} from '@shopify/react-native-skia';

import { useColors } from '@Theme/index';
import { SharedValue } from 'react-native-reanimated';

export const Wave: React.FC<{
  progress: SharedValue<number>;
  width: number;
  height: number;
}> = ({ progress, width, height }) => {
  const colors = useColors();

  return (
    <Canvas style={{ width, height, backgroundColor: colors.background }}>
      <Rect x={0} width={width} height={height}>
        <LinearGradient
          start={vec(3, 0)}
          end={vec(0, 0)}
          colors={[colors.background, colors.text, colors.background]}
          mode={'mirror'}
        />
      </Rect>
      <Rect width={progress} height={height}>
        <Blend mode={'multiply'}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, width)}
            colors={[colors.cyan, colors.pink, colors.pink]}
          />
          <LinearGradient
            start={vec(3, 0)}
            end={vec(0, 0)}
            colors={[colors.background, 'transparent', colors.background]}
            mode={'mirror'}
          />
        </Blend>
      </Rect>
    </Canvas>
  );
};
export default Wave;
