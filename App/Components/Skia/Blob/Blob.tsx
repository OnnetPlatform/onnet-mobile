import { blue, pink } from '@Theme/Colors';
import { useColors } from '@Theme/index';
import {
  BackdropBlur,
  Canvas,
  Circle,
  Fill,
  FractalNoise,
  useClock,
  Rect,
  Group,
  Paint,
  ColorMatrix,
  Blur,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

export const Blob: React.FC = () => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();

  const array = Array.from({ length: 2 }, (_, i) => i);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Rect width={width} height={height}>
        <LinearGradient
          colors={[colors.background, colors.blue]}
          start={vec(0, 0)}
          end={vec(width, width)}
        />
      </Rect>
      <Group
        layer={
          <Paint>
            <Blur blur={20} />
            <ColorMatrix
              matrix={[
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 18, -7,
              ]}
            />
          </Paint>
        }>
        {array.map((index) => {
          return <AnimatedCircle index={index} array={array} key={index} />;
        })}
      </Group>
      <BackdropBlur blur={100} blendMode={'overlay'} />
      <Fill color={colors.background} />
    </Canvas>
  );
};

const AnimatedCircle: React.FC<{ index: number; array: number[] }> = ({
  index,
  array,
}) => {
  const { width, height } = useWindowDimensions();
  const colors = useColors();
  const clock = useClock();
  const cx = useDerivedValue(
    () =>
      width / 2 +
      Math.sin((((clock.value / 10000) * Math.PI) / array.length) * index) * 100
  );
  const cy = useDerivedValue(
    () =>
      height / 2 +
      Math.cos(
        (((clock.value / 100000) * Math.PI) / array.length) * index * 10
      ) *
        400
  );

  return <Circle cx={cx} cy={cy} r={100} color={colors.text} />;
};

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(4, '0');
  return `#${randomColor}`;
};
