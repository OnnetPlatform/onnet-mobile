import { Group, Path, Skia } from '@shopify/react-native-skia';
import { useColors } from '@Theme';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import { PolyrhythmsCircle } from '../Circle/PolyrhythmsCircle';
import { ArcDimentions } from '../types';

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
      <Path path={path} style="stroke" color={colors.black} strokeWidth={1} />
      <PolyrhythmsCircle arc={arc} rect={arcRect} />
    </Group>
  );
};
