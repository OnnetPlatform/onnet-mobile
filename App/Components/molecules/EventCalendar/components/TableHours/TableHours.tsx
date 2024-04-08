import {
  CELL_HEIGHT,
  HOURS,
  HOURS_WIDTH,
} from '@Molecules/EventCalendar/constants';
import {
  Group,
  Text,
  useFont,
  vec,
  BackdropBlur,
  Fill,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { TableSeparator } from '..';
import { useWindowDimensions } from 'react-native';
import { useColors } from '@Theme/index';
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const TableHours: React.FC = () => {
  const { width } = useWindowDimensions();
  const colors = useColors();
  const title = useFont(require('../../Inter-Regular.ttf'), 12);
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
  }, []);
  return (
    <Group>
      <BackdropBlur
        blur={5}
        clip={{
          x: 0,
          y: 0,
          width: HOURS_WIDTH,
          height: 25 * CELL_HEIGHT,
        }}>
        <Fill color={colors.blur} />
      </BackdropBlur>

      {HOURS.map((item, index) => {
        const gab = index * 4;
        return (
          <Group key={index}>
            <TableSeparator
              p1={vec(width, index * CELL_HEIGHT + gab - 2)}
              p2={vec(0, index * CELL_HEIGHT + gab - 2)}
            />
            <Text
              color={colors.text}
              x={8}
              y={index * CELL_HEIGHT + gab + 16}
              text={item.toString()}
              font={title}
              key={index}
            />
          </Group>
        );
      })}
    </Group>
  );
};
export default TableHours;
