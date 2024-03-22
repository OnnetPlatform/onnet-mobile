import { Calendar } from '@Khayat/Redux/Reducers/EventReducer/types';
import { CELL_HEIGHT, CELL_WIDTH } from '@Molecules/EventCalendar/constants';
import { useColors } from '@Theme/index';
import {
  FontWeight,
  FontWidth,
  Skia,
  useFonts,
} from '@shopify/react-native-skia';
import moment from 'moment';
import React, { useCallback } from 'react';
import { TableCell } from '../TableCell/TableCell';

export const TableBody: React.FC<{ data: Calendar[] }> = ({ data }) => {
  const customFontMgr = useFonts({
    Inter: [
      require('../../Inter-Bold.ttf'),
      require('../../Inter-Regular.ttf'),
    ],
  });
  const colors = useColors();

  const renderBody = useCallback(() => {
    if (!customFontMgr) return null;
    return data.map((outer, i) => {
      return outer.data.map((item, index) => {
        const gab = i * 4;
        const fromHour = moment(item.date).hour();
        const toHour = moment(item.date)
          .add(60 * item.duration * 1000)
          .hour();
        const toY = toHour > fromHour ? toHour : 25;
        const y = fromHour * CELL_HEIGHT + toY * 4 - 6;

        const titleParagraph = Skia.ParagraphBuilder.Make(
          undefined,
          customFontMgr
        )
          .pushStyle({
            color: Skia.Color(colors.text),
            fontSize: 15,
            fontFamilies: ['Inter'],
            fontStyle: {
              weight: FontWeight.Bold,
              width: FontWidth.UltraExpanded,
            },
          })
          .addText(item.title.slice(0, 63))
          .build();
        const subtitle = Skia.ParagraphBuilder.Make(undefined, customFontMgr)
          .pushStyle({
            color: Skia.Color(colors.text),
            fontSize: 14,
            fontFamilies: ['Inter'],
            fontStyle: { weight: FontWeight.Light },
          })
          .addText(moment(item.date).format('hh:mm A'))
          .build();
        titleParagraph.layout(CELL_WIDTH - 10);

        const height = Math.abs(item.duration / 60) * CELL_HEIGHT;
        return (
          <TableCell
            index={index}
            key={index}
            container={{
              height,
              width: CELL_WIDTH,
              x: i * CELL_WIDTH + gab,
              color: colors.secondaryBackground,
              y: y,
            }}
            title={{
              x: i * CELL_WIDTH + 12 + gab,
              y: y + 9,
              paragraph: titleParagraph,
              width: CELL_WIDTH - 20,
              color: colors.text,
            }}
            subtitle={{
              x: i * CELL_WIDTH + 12 + gab,
              y: y + height - 30,
              paragraph: subtitle,
              width: CELL_WIDTH - 20,
              color: colors.text,
            }}
          />
        );
      });
    });
  }, [customFontMgr, colors, data]);

  if (!customFontMgr) return null;

  return renderBody();
};
