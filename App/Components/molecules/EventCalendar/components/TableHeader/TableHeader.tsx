import { CELL_HEIGHT, CELL_WIDTH } from '@Molecules/EventCalendar/constants';
import { useColors } from '@Theme/index';
import { Group, Text, useFont, vec } from '@shopify/react-native-skia';
import React from 'react';
import { TableSeparator } from '..';
import { useWindowDimensions } from 'react-native';

const Y = CELL_HEIGHT / 4;
const X = CELL_WIDTH / 2;

export const TableHeader: React.FC<{
  data: { title: string; subtitle: string }[];
}> = ({ data }) => {
  const title = useFont(require('../../Inter-Bold.ttf'), 16);
  const subtitle = useFont(require('../../Inter-Regular.ttf'), 14);
  const { height } = useWindowDimensions();
  const colors = useColors();
  return data.map((item, index) => {
    const gab = index * 4;
    const x = CELL_WIDTH * index + gab;
    const start = index * CELL_WIDTH + gab - 2;
    return (
      <Group key={index}>
        {index > 0 && (
          <TableSeparator p1={vec(start, 0)} p2={vec(start, height)} />
        )}

        <Group>
          <Text
            font={title}
            x={X + x - 16}
            y={Y}
            text={item.title}
            color={colors.text}
          />
          <Text
            font={subtitle}
            x={X + x - 4}
            y={Y + 18}
            text={item.subtitle}
            color={colors.text}
          />
        </Group>
      </Group>
    );
  });
};

export default TableHeader;
