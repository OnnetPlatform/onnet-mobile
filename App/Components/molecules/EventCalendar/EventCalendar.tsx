import {
  BackdropBlur,
  Canvas,
  FontWeight,
  Group,
  Paragraph,
  Rect,
  RoundedRect,
  Skia,
  useFonts,
} from '@shopify/react-native-skia';
import React, { PropsWithChildren, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { DATA } from './DATA';
import { useColors } from '@Theme/index';
import moment from 'moment';
import { TableHeader } from './components';
import TableHours from './components/TableHours/TableHours';
import { HOURS_WIDTH } from './constants';
import { TableCell } from './components/TableCell/TableCell';
import { TableBody } from './components/TableBody/TableBody';
import { useSelector } from 'react-redux';
import { EventSelector } from '@Khayat/Redux/Selectors/EventSelector';

const CELL_WIDTH = 200;
const CELL_HEIGHT = 100;
export const EventCalendar: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const rightBoundary = 0;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { events } = useSelector(EventSelector);
  const leftBoundary = -width * events.length;

  const customFontMgr = useFonts({
    Inter: [require('./Inter-Bold.ttf'), require('./Inter-Regular.ttf')],
  });

  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd((e) => {
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
      translateY.value = withDecay({
        velocity: e.velocityY,
        clamp: [-2400, 0],
      });
    });

  useEffect(() => {
    if (events.length > 0) {
      const currentDate = events.findIndex(
        ({ year, day, month }) =>
          year === moment().year() &&
          month === moment().month() + 1 &&
          day === moment().date()
      );
      translateX.value = -(currentDate * CELL_WIDTH + currentDate * 4);
    }
  }, [events]);

  if (!customFontMgr) return null;
  // return null;
  return (
    <SafeAreaView edges={[]} style={{ flex: 1, flexGrow: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ flex: 1, flexGrow: 1 }}>
          <Rect width={width} height={height} color={colors.background} />
          <GroupContainer
            x={HOURS_WIDTH}
            y={insets.top + CELL_HEIGHT / 2 + 8}
            pageX={translateX}
            pageY={translateY}>
            <TableBody data={events} />
          </GroupContainer>

          <GroupContainer
            x={0}
            y={insets.top + CELL_HEIGHT / 2 + 8}
            pageX={translateX}
            disableHorizontal
            pageY={translateY}>
            <TableHours />
          </GroupContainer>
          <BackdropBlur
            blur={4}
            clip={{
              x: 0,
              y: 0,
              height: CELL_HEIGHT / 2 + insets.top,
              width: 8 * CELL_WIDTH,
            }}
          />
          <GroupContainer
            disableVertical={true}
            pageY={translateY}
            pageX={translateX}
            y={insets.top}
            x={HOURS_WIDTH}>
            <TableHeader
              data={events.map(({ year, month, day }) => ({
                title: moment({ year, month: month - 1, day })
                  .format('ddd')
                  .toUpperCase(),
                subtitle: moment({ year, month: month - 1, day }).format('DD'),
              }))}
            />
          </GroupContainer>
        </Canvas>
      </GestureDetector>
    </SafeAreaView>
  );
};

const GroupContainer: React.FC<
  PropsWithChildren<{
    pageY: SharedValue<number>;
    pageX: SharedValue<number>;
    y: number;
    x: number;
    disableVertical?: boolean;
    disableHorizontal?: boolean;
    maxLeft?: number;
  }>
> = ({ pageX, pageY, disableVertical, x, y, children, disableHorizontal }) => {
  const translateY = useDerivedValue(
    () => (disableVertical ? y : y + pageY.value),
    [disableVertical]
  );

  const translateX = useDerivedValue(
    () => (disableHorizontal ? x : x + pageX.value),
    []
  );

  const transform = useDerivedValue(
    () => [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
    []
  );
  return <Group transform={transform}>{children}</Group>;
};

export default EventCalendar;
