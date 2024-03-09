import {
  BackdropBlur,
  Canvas,
  Group,
  LinearGradient,
  Mask,
  Rect,
  Text,
  useClock,
  useDerivedValueOnJS,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export const LogoLoading: React.FC = () => {
  const font = useFont(require('./Rubik-Black.ttf'), 64);
  const { width, height } = useWindowDimensions();
  const clock = useClock();
  const offset = useSharedValue(0);
  const end = useDerivedValueOnJS(() => {
    if (offset.value > (width - 128) * 15) {
      offset.value = 0;
    }
    offset.value = offset.value + 10;

    return vec(offset.value, 0);
  }, [clock]);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Mask
        mask={
          <Rect x={64} y={height / 2 - 24} width={width - 128} height={64}>
            <LinearGradient
              start={vec(0, 0)}
              colors={['#c0c0c0', '#262728', '#c0c0c0']}
              end={end}
            />
            <BackdropBlur blur={100} />
          </Rect>
        }>
        <Group blendMode={'difference'}>
          <Text
            x={width / 2 - 32 * 3.5}
            y={height / 2 + 24}
            font={font}
            text={'ONNET'}
            color={'#262728'}
          />
        </Group>
      </Mask>
    </Canvas>
  );
};
export default LogoLoading;
