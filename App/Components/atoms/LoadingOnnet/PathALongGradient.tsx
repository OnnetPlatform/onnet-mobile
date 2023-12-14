import React from 'react';
import type {
  SkiaValue,
  SkPath,
  Vector,
  Line,
  SkPaint,
} from '@shopify/react-native-skia';
import {Group, rect, Skia, Path} from '@shopify/react-native-skia';

import {fitRect} from './geometry';
import {useColors} from '@Theme';

const strokeWidth = 3;
const pad = 0;

export const dst = rect(pad, pad, 36 - pad * 2, 36 - pad * 2);

export const prepare = (svg: string) => {
  const path = Skia.Path.MakeFromSVGString(svg)!;
  const src = path.computeTightBounds();
  const m3 = fitRect(src, dst);
  path.transform(m3);
  return {path, totalLength: 1, lines: []};
};

export interface Line {
  p1: Vector;
  p2: Vector;
  length: number;
  paint: SkPaint;
}

interface GradientAlongPathProps {
  path: SkPath;
  totalLength: number;
  lines: Line[];
  progress: SkiaValue<number>;
}

export const GradientAlongPath = ({progress, path}: GradientAlongPathProps) => {
  const colors = useColors();
  return (
    <Group>
      <Path
        path={path}
        color={colors.secondaryBackground}
        end={1}
        style={'stroke'}
        strokeWidth={strokeWidth}
      />
      <Path
        path={path}
        color={colors.text}
        strokeCap={'round'}
        strokeJoin={'round'}
        end={progress}
        style={'stroke'}
        strokeWidth={strokeWidth}
      />
    </Group>
  );
};
