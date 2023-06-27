import {
  BackdropBlur,
  Canvas,
  Group,
  LinearGradient,
  Mask,
  Rect,
  Text,
  useClockValue,
  useComputedValue,
  useFont,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useColors } from '../../../Theme';

export const LogoLoading: React.FC = () => {
  const font = useFont(require('../Rubik-Black.ttf'), 64);
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  const clock = useClockValue();
  const offset = useValue(0);
  const end = useComputedValue(() => {
    offset.current = offset.current + 5;
    return vec(offset.current, 0);
  }, [clock]);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Mask
        mask={
          <Rect x={64} y={height / 2 - 96} width={width - 128} height={64}>
            <LinearGradient
              start={vec(64, 0)}
              colors={[colors.text, colors.background]}
              end={end}
            />
            <BackdropBlur blur={100} />
          </Rect>
        }>
        <Group blendMode={'difference'}>
          <Text
            strokeWidth={20}
            x={width / 2 - 32 * 3.5}
            y={height / 2 - 32}
            font={font}
            text={'ONNET'}
            color={colors.background}
          />
        </Group>
      </Mask>
    </Canvas>
  );
};
export default LogoLoading;
