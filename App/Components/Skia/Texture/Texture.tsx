import { useColors } from '@Theme/index';
import {
  Blend,
  Canvas,
  Fill,
  LinearGradient,
  Rect,
  Turbulence,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

export const Texture: React.FC = () => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Rect width={width} height={height}>
        <Blend mode={'difference'}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[colors.background]}
          />
          <Turbulence freqX={1} freqY={1} octaves={2} />
        </Blend>
      </Rect>
    </Canvas>
  );
};
export default Texture;
