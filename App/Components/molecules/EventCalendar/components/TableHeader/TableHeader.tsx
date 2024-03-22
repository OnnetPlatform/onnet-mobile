import { CELL_HEIGHT, CELL_WIDTH } from '@Molecules/EventCalendar/constants';
import { useColors } from '@Theme/index';
import {
  Circle,
  FontWeight,
  Group,
  Paragraph,
  Skia,
  TextAlign,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';
import { TableSeparator } from '..';
import { useWindowDimensions } from 'react-native';
import { ThemeColors } from '@Theme/Colors';

const Y = CELL_HEIGHT / 4;
const X = CELL_WIDTH / 2;

export const TableHeader: React.FC<{
  data: { title: string; subtitle: string }[];
}> = ({ data }) => {
  const { height } = useWindowDimensions();
  const colors = useColors();
  return data.map((item, index) => {
    const gab = index * 4;
    const x = CELL_WIDTH * index + gab;
    const start = index * CELL_WIDTH + gab - 2;
    const isToday = item.subtitle === new Date().getDate().toString();
    const titleParagraph = buildParagraph(
      item.title,
      FontWeight.Bold,
      colors,
      isToday
    );
    const subtitleParagraph = buildParagraph(
      item.subtitle,
      FontWeight.Normal,
      colors,
      isToday
    );

    return (
      <Group key={index}>
        {index > 0 && (
          <TableSeparator p1={vec(start, 0)} p2={vec(start, height)} />
        )}
        {isToday && <Circle cx={X + x} cy={Y + 4} r={30} color={colors.cyan} />}
        <Group>
          <Paragraph
            paragraph={titleParagraph}
            x={X + x - 20}
            y={Y - 11}
            color={colors.text}
            width={40}
          />
          <Paragraph
            paragraph={subtitleParagraph}
            x={X + x - 20}
            y={Y + 6}
            color={colors.text}
            width={40}
          />
        </Group>
      </Group>
    );
  });
};

const buildParagraph = (
  text: string,
  weight: FontWeight,
  colors: ThemeColors,
  isToday?: boolean
) => {
  return Skia.ParagraphBuilder.Make({
    textAlign: TextAlign.Center,
  })
    .pushStyle({
      color: Skia.Color(isToday ? colors.background : colors.text),
      fontSize: 15,
      fontStyle: { weight },
    })
    .addText(text)
    .build();
};

export default TableHeader;
