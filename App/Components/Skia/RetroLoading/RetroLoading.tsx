import { Canvas, Group, Text, useFont } from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export const RetroLoading: React.FC = () => {
  const font = useFont(require('./Silkscreen.ttf'), 32);
  const { width, height } = useWindowDimensions();
  const sharedValue = useSharedValue('CONNECTING ');
  let count = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 3) {
        sharedValue.value = sharedValue.value.replace('...', '.');
        count = 0;
      } else sharedValue.value += '.';
      count++;
    }, 1000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Group blendMode={'difference'}>
        <Text
          x={width / 2 - 120}
          y={height / 2}
          font={font}
          text={sharedValue}
          origin={{ x: 0, y: 0 }}
          color={'#fff'}
        />
      </Group>
    </Canvas>
  );
};
