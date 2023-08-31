import { Group, Path, Skia, useValue } from '@shopify/react-native-skia';
import React from 'react';
import { PolyrhythmsCircle } from '../Circle/PolyrhythmsCircle';
import { useWindowDimensions } from 'react-native';
import { ArcDimentions, ArcRect } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../../../../Theme';
const r = 100;
export const Arc: React.FC<{
  arc: ArcDimentions;
}> = ({ arc }) => {
  const path = Skia.Path.Make();
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  const arcRect = {
    x: width / 2 - arc.radius / 2,
    y: height / 2 - arc.radius / 2 - 24,
    width: arc.radius,
    height: arc.radius,
  };
  path.addArc(arcRect, 0, 360);

  return (
    <Group>
      <Path path={path} style="stroke" color={colors.black} strokeWidth={1}></Path>
      <PolyrhythmsCircle arc={arc} rect={arcRect} />
    </Group>
  );
};
