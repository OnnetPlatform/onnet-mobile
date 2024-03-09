import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useColors } from '@Theme/index';
import {
  BackdropBlur,
  Canvas,
  Rect,
  vec,
  RadialGradient,
  Blend,
  Turbulence,
  Circle,
  useClock,
  LinearGradient,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export const Blob: React.FC = () => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  const clock = useClock();
  const position = useSharedValue(0);

  const radius = useDerivedValue(() =>
    Math.abs(Math.sin(clock.value / 10000) * 100)
  );
  const { access_token } = useSelector(AuthSelector);
  const positions = useDerivedValue(
    () => [1.6 - position.value, 1.8 - position.value, 2 - position.value],
    [position]
  );

  useEffect(() => {
    position.value = 0;
    if (access_token)
      position.value = withDelay(1500, withTiming(2, { duration: 1500 }));
  }, [access_token]);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Circle cx={0} r={height} cy={0} color={colors.background} />
      <Circle
        cx={width / 2}
        r={height}
        cy={height / 2}
        color={colors.background}
      />
      <Circle cx={0} r={70} cy={height / 2} color={colors.text} />
      <Circle cx={width} r={radius} cy={height} color={colors.turquoise} />
      <Circle cx={width} r={50} cy={0} color={colors.text} />
      <BackdropBlur blur={100} blendMode={'overlay'} />

      <Rect width={width} height={height}>
        <Blend mode={'dstIn'}>
          <RadialGradient
            colors={[colors.background, colors.text]}
            r={6}
            c={vec(0, 0)}
            mode={'repeat'}
          />
          <Turbulence freqX={1} freqY={1} octaves={1} />
        </Blend>
      </Rect>
      <Rect width={width} height={height}>
        <LinearGradient
          colors={['transparent', colors.text, 'transparent']}
          start={vec(0, 0)}
          end={vec(0, height)}
          positions={positions}
        />
      </Rect>
    </Canvas>
  );
};
