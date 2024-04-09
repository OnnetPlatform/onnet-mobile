import { useColors } from '@Theme/index';
import { Line, SkPoint } from '@shopify/react-native-skia';
import React from 'react';

export const TableSeparator: React.FC<{
  p1: SkPoint;
  p2: SkPoint;
  color?: string;
}> = ({ p1, p2, color }) => {
  const colors = useColors();
  return (
    <Line
      p1={p1}
      p2={p2}
      color={color || colors.secondaryBackground}
      style="stroke"
      strokeWidth={1}
    />
  );
};
export default TableSeparator;
