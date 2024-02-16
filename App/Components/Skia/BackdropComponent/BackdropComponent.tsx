import { BackdropFilter, Blur, Canvas, Fill } from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

export const BackdropComponent = () => {
  const { width, height } = useWindowDimensions();
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <BackdropFilter
        filter={<Blur blur={20} mode={'mirror'} />}
        blendMode={'colorDodge'}
        clip={{ x: 0, y: 0, height: height, width }}>
        <Fill color="transparent" />
      </BackdropFilter>
    </Canvas>
  );
};
