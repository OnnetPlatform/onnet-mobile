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
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useColors} from '@Theme';

export const LogoLoading: React.FC = () => {
  const font = useFont(require('./Rubik-Black.ttf'), 64);
  const {width, height} = useWindowDimensions();
  const colors = useColors();
  const clock = useClockValue();
  const offset = useValue(0);
  const end = useComputedValue(() => {
    if (offset.current > (width - 128) * 15) {
      offset.current = 0;
    }
    offset.current = offset.current + 10;

    return vec(offset.current, 0);
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
