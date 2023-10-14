import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Arc} from './Arc/Arc';
import {arcs} from './utils';
import {useColors} from '@Theme';

export const Polyrhythms: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const stroke = Skia.Path.Make();
  const colors = useColors();
  stroke.lineTo(width, 0);
  return (
    <Canvas
      style={[
        StyleSheet.absoluteFillObject,
        {
          transform: [
            {
              scale: 0.6,
            },
          ],
        },
      ]}>
      <Path
        path={stroke}
        style={'stroke'}
        transform={[
          {
            translateY: height / 2 - 24,
          },
        ]}
        color={colors.background}
        strokeWidth={0.5}
      />
      {arcs.map((item, index) => (
        <Arc arc={item} key={index} />
      ))}
    </Canvas>
  );
};
