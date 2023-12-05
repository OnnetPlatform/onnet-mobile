import {
  Circle,
  useClockValue,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { useColors } from '@Theme';
import React from 'react';
import { useWindowDimensions } from 'react-native';

import { ArcDimentions, ArcRect } from '../types';

export const PolyrhythmsCircle: React.FC<{
  arc: ArcDimentions;
  rect: ArcRect;
}> = ({ arc /* rect*/ }) => {
  const clock = useClockValue();
  const theta = useValue(Math.PI);
  // const maxAngle = Math.PI * 2;
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  // const rectX = rect.x;
  const rectY = height / 2 - 24;
  const x = useComputedValue(() => {
    theta.current += 0.004 * (arc.index + 1 * 2);
    return (arc.radius / 2) * Math.cos(theta.current) + width / 2;
  }, [clock]);

  const y = useComputedValue(() => {
    const sinTheta = Math.sin(theta.current);
    // const is2Pi = theta.current % maxAngle >= Math.PI;
    // if (is2Pi)
    return (arc.radius / 2) * sinTheta + rectY;
    // return (arc.radius / 2) * Math.sin(maxAngle - theta.current) + rectY;
  }, [clock]);

  return <Circle cx={x} cy={y} r={10} color={colors.black} />;
};
