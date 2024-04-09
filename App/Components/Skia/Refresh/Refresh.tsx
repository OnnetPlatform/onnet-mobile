import { useColors } from '@Theme/index';
import {
  BackdropBlur,
  Canvas,
  LinearGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue, withTiming } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

export const Refresh: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const { width, height } = useWindowDimensions();
  const position = useSharedValue(0);
  const colors = useColors();
  const positions = useDerivedValue(
    () => [1.6 - position.value, 1.8 - position.value, 2 - position.value],
    [position]
  );

  useEffect(() => {
    if (loading) position.value = 0;
    if (!loading) position.value = withTiming(2, { duration: 500 });
  }, [loading]);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect width={width} height={height}>
        <LinearGradient
          colors={[colors.background, colors.text, colors.background]}
          start={vec(0, 0)}
          end={vec(0, height)}
          positions={positions}
        />
      </Rect>
      <BackdropBlur blur={100} />
    </Canvas>
  );
};

export default Refresh;
