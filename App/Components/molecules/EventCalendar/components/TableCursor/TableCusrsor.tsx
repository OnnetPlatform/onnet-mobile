import { SCROLLING_STATE } from '@Molecules/EventCalendar/EventCalendar';
import { CELL_HEIGHT } from '@Molecules/EventCalendar/constants';
import { useColors } from '@Theme/index';
import { Line, useClock, vec } from '@shopify/react-native-skia';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { EdgeInsets } from 'react-native-safe-area-context';

const HOURS = 60 * 60;
export const TbaleCusrsor: React.FC<{
  insets: EdgeInsets;
  pageY: SharedValue<number>;
  isScolling: SharedValue<SCROLLING_STATE>;
}> = ({ insets, pageY, isScolling }) => {
  const { width, height } = useWindowDimensions();
  const now = moment();
  const offset = useSharedValue(0);
  const minutes = now.minutes();
  const seconds = now.seconds();
  const clock = useClock();
  const colors = useColors();
  useEffect(() => {
    offset.value = withTiming(1000, { duration: 1000 });
  }, []);

  const p1 = useDerivedValue(() => {
    const secondOffset = ((seconds + clock.value / 1000) / HOURS) * CELL_HEIGHT;
    const minutesOffset = (minutes / 60) * CELL_HEIGHT;
    const newOffset =
      new Date().getHours() * CELL_HEIGHT +
      insets.top +
      new Date().getHours() * 4 +
      CELL_HEIGHT / 2 +
      minutesOffset +
      secondOffset;
    if (isScolling.value === SCROLLING_STATE.NO) {
      pageY.value = withSpring(Math.min(-newOffset + height / 2, 0));
    }
    return vec(0, newOffset);
  });
  const p2 = useDerivedValue(() => {
    const secondOffset = ((seconds + clock.value / 1000) / HOURS) * CELL_HEIGHT;
    const minutesOffset = (minutes / 60) * CELL_HEIGHT;
    const newOffset =
      new Date().getHours() * CELL_HEIGHT +
      insets.top +
      new Date().getHours() * 4 +
      CELL_HEIGHT / 2 +
      minutesOffset +
      secondOffset;
    return vec(width, newOffset);
  });

  return <Line p1={p1} p2={p2} strokeWidth={1} color={colors.turquoise} />;
};
