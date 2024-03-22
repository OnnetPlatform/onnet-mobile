import {
  BackdropBlur,
  Canvas,
  Circle,
  Fill,
  Group,
  GroupProps,
  Rect,
  useFonts,
} from '@shopify/react-native-skia';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  SharedValue,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useColors } from '@Theme/index';
import moment from 'moment';
import { TableHeader } from './components';
import TableHours from './components/TableHours/TableHours';
import { HOURS_WIDTH, CELL_WIDTH, CELL_HEIGHT } from './constants';
import { TableBody } from './components/TableBody/TableBody';
import { useSelector } from 'react-redux';
import { EventSelector } from '@Khayat/Redux/Selectors/EventSelector';
import { TbaleCusrsor } from './components/TableCursor/TableCusrsor';
import { useAppNavigation } from '@Hooks/useAppNavigation';
import { useScrollToToday } from '@Hooks/useScrollToToday';

export enum SCROLLING_STATE {
  YES = 'yes',
  NO = 'no',
}
export const EventCalendar: React.FC<{ expandButton: SharedValue<number> }> = ({
  expandButton,
}) => {
  const { width, height } = useWindowDimensions();
  const rightBoundary = 0;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isScolling = useSharedValue<SCROLLING_STATE>(SCROLLING_STATE.NO);
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { events } = useSelector(EventSelector);
  const leftBoundary = -width * events.length;
  const navigation = useAppNavigation();

  const HEADER_HEIGHT = insets.top + CELL_HEIGHT / 2 + 8;
  const customFontMgr = useFonts({
    Inter: [require('./Inter-Bold.ttf'), require('./Inter-Regular.ttf')],
  });

  const scrollToX = useCallback(() => {
    if (events.length > 0) {
      const currentDate = events.findIndex(
        ({ year, day, month }) =>
          year === moment().year() &&
          month === moment().month() + 1 &&
          day === moment().date()
      );
      translateX.value = withSpring(
        -(currentDate * CELL_WIDTH + currentDate * 4) + 4
      );
    }
  }, [events]);

  const navigateToEvent = (hour: number, day: number) => {
    const eventData = events.find((item) => item.day === day);
    if (eventData) {
      const event = eventData.data.find(
        (item) => moment(item.date).hours() === hour
      );
      if (event) {
        navigation.navigate('EventScreen', { event });
      }
    }
  };
  const tapGesture = Gesture.Tap().onEnd((e) => {
    const day = Math.abs(
      Math.trunc((translateX.value - e.absoluteX) / (CELL_WIDTH - 4))
    );
    const hour = Math.abs(
      Math.trunc(
        (translateY.value - e.absoluteY + HEADER_HEIGHT) / (CELL_HEIGHT + 4)
      )
    );
    runOnJS(navigateToEvent)(hour, day);
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isScolling.value = SCROLLING_STATE.YES;
      expandButton.value = withTiming(0, { duration: 100 });
    })
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd((e) => {
      translateX.value = withDecay(
        {
          velocity: e.velocityX,
          clamp: [leftBoundary, rightBoundary],
        },
        (isFinished) => {
          if (isFinished)
            expandButton.value = withDelay(
              100,
              withTiming(1, { duration: 200 })
            );
        }
      );
      translateY.value = withDecay(
        {
          velocity: e.velocityY,
          clamp: [-2500, 0],
        },
        (isFinished) => {
          if (isFinished)
            expandButton.value = withDelay(
              100,
              withTiming(1, { duration: 200 })
            );
        }
      );
    });

  const gesture = Gesture.Simultaneous(panGesture, tapGesture);

  useEffect(() => {
    if (events.length > 0) {
      const currentDate = events.findIndex(
        ({ year, day, month }) =>
          year === moment().year() &&
          month === moment().month() + 1 &&
          day === moment().date()
      );
      translateX.value = -(currentDate * CELL_WIDTH + currentDate * 4) + 4;
    }
  }, [events]);

  useScrollToToday(() => {
    scrollToX();
    isScolling.value = SCROLLING_STATE.NO;
  }, [events]);

  if (!customFontMgr) return null;
  // return null;
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, flexGrow: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ flex: 1, flexGrow: 1 }}>
          <Rect width={width} height={height} color={colors.background}></Rect>
          <Circle
            r={75}
            cx={HOURS_WIDTH / 2 + width / 2}
            cy={height / 2}
            color={colors.cyan}
          />
          <BackdropBlur blur={100} />
          <GroupContainer
            x={HOURS_WIDTH}
            y={insets.top + CELL_HEIGHT / 2 + 8}
            pageX={translateX}
            pageY={translateY}>
            <TableBody data={events} />
          </GroupContainer>
          <GroupContainer
            disableHorizontal
            x={0}
            y={0}
            pageX={translateX}
            pageY={translateY}>
            <TbaleCusrsor
              isScolling={isScolling}
              pageY={translateY}
              insets={insets}
            />
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
            blendMode={'color'}
            clip={{
              x: 0,
              y: 0,
              height: CELL_HEIGHT / 2 + insets.top + 16,
              width: 8 * CELL_WIDTH,
            }}>
            <Fill color={colors.blur} />
          </BackdropBlur>
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
    blendMode?: GroupProps['blendMode'];
  }>
> = ({
  pageX,
  pageY,
  disableVertical,
  x,
  y,
  children,
  disableHorizontal,
  blendMode,
}) => {
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
  return (
    <Group blendMode={blendMode} transform={transform}>
      {children}
    </Group>
  );
};

export default EventCalendar;
