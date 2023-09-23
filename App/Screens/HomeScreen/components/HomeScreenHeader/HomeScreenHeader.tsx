import { BlurView } from '@react-native-community/blur';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, View, ViewStyle } from 'react-native';
import Animated, {
  FadeIn,
  interpolate,
  measure,
  runOnUI,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../../../Components/atoms';
import { useColors } from '../../../../Theme';
import styles, { withColors, withInsets } from './HomeScreen.styles';
import { MONTHS, WEEK, createCalendar } from '../../../../Components/molecules/Calendar/helpers';
const { width } = Dimensions.get('window');

export const HomseScreenHeader: React.FC<{
  onCreatePressed?(): void;
  animatedHeaderValue?: SharedValue<number>;
  selectedDate: Date | undefined;
  onDateSelected: (date: Date) => void;
}> = ({
  onCreatePressed,
  animatedHeaderValue = useSharedValue(0),
  selectedDate,
  onDateSelected,
}) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const insetStyles = withInsets(insets);
  const listHeight = useSharedValue(101);
  const height = useSharedValue<number>(101);
  const ref = useAnimatedRef<any>();
  const daysref = useAnimatedRef<any>();
  const textChanged = useSharedValue(0);
  const currentHeight = useDerivedValue(() =>
    height.value === 0 ? listHeight.value : height.value > 15 ? 0 : listHeight.value + 16
  );
  const data = new Array()
    .concat(createCalendar(MONTHS[0], new Date().getFullYear()))
    .concat(createCalendar(MONTHS[1], new Date().getFullYear()))
    .concat(createCalendar(MONTHS[2], new Date().getFullYear()));

  const viewRef = useAnimatedRef<any>();

  useAnimatedReaction(
    () => animatedHeaderValue.value,
    (h) => (height.value = h)
  );

  const measureLayout = () =>
    runOnUI(() => {
      'worklet';
      const measured = measure(viewRef)?.height;
      if (measured > 0 || listHeight.value < measured) listHeight.value = measured;
    })();

  useEffect(() => {
    if (viewRef.current) measureLayout();
  }, [viewRef, viewRef.current]);

  const onLayout = () =>
    setTimeout(() => {
      const index = data.findIndex((day) => day.getDate() === new Date().getDate());
      const day = data[index].getDay();
      const offset = day === 6 ? 0 : day + 1;
      ref.current.scrollToOffset({ offset: (index - offset) * (width / 7), animated: false });
    }, 100);

  const animatedFlatListStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(currentHeight.value, {
        damping: 100,
        overshootClamping: false,
        velocity: 0.3,
      }),
      overflow: 'hidden',
    };
  }, []);

  const getItemLayout = (data: any, index: number) => ({
    length: data.length,
    offset: index,
    index,
  });

  const selectedDayStyle = (day: number) => {
    if (!selectedDate) return {};
    const selctedDayIndex = selectedDate.getDay() === 6 ? 0 : selectedDate.getDay() + 1;
    const style: ViewStyle = {
      borderColor: day === selctedDayIndex ? colors.text : 'transparent',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      overflow: 'hidden',
      borderWidth: 2,
      backgroundColor: day === selctedDayIndex ? colors.background : 'transparent',
    };
    return style;
  };

  const textAnimation = useAnimatedStyle(() => ({
    width: interpolate(textChanged.value, [0, 1], [0, 200]),
    opacity: interpolate(textChanged.value, [0, 1], [0, 1]),
  }));

  useEffect(() => {
    textChanged.value = withTiming(0, { duration: 10 }, (isFinished) => {
      if (isFinished) {
        textChanged.value = withTiming(1, { duration: 500 });
      }
    });
  }, [selectedDate]);

  const onScroll = useAnimatedScrollHandler<{ index: number }>({
    onBeginDrag: (event, ctx) => {
      const w = width / 7;
      const index = (event.contentOffset.x + width / 2) / w;
      ctx.index = Math.floor(index);
    },
  });

  return (
    <>
      <View
        style={{
          overflow: 'hidden',
          zIndex: 1,
          backgroundColor: colors.background,
        }}>
        <View style={insetStyles.header}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle} fontSize={24} weight={'black'}>
                Events
              </Text>
              <Text
                weight="semibold"
                fontSize={12}
                numberOfLines={1}
                style={[{ textTransform: 'uppercase', overflow: 'hidden' }, textAnimation]}>
                {moment(selectedDate || new Date()).format('dddd, MMMM Do')}
              </Text>
            </View>
            <Pressable onPress={onCreatePressed}>
              <Icon fill={colors.text} name={'plus-outline'} />
            </Pressable>
          </View>

          <Animated.View ref={viewRef} style={animatedFlatListStyle}>
            <Animated.FlatList
              horizontal
              data={WEEK}
              ref={daysref}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <Animated.View
                  entering={FadeIn.delay(100 * index)}
                  style={[styles.day, selectedDayStyle(index)]}>
                  <Text>{item[0]}</Text>
                </Animated.View>
              )}
            />
            <Animated.FlatList
              data={data}
              getItemLayout={getItemLayout}
              decelerationRate={0.5}
              onLayout={onLayout}
              horizontal={true}
              onScrollEndDrag={onScroll}
              snapToInterval={width}
              showsHorizontalScrollIndicator={false}
              // @ts-ignore
              ref={ref}
              renderItem={({ index, item }) => (
                <DateSlot
                  id={index}
                  date={item}
                  onPress={onDateSelected}
                  selectedDate={selectedDate}
                />
              )}
            />
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const DateSlot = React.memo(
  ({ date, onPress, selectedDate }: any) => {
    const colors = useColors();
    const style = withColors(colors);
    const today = new Date().getDate();
    const isToday = today === date.getDate();
    const selectedDateStyle = () => {
      if (!selectedDate) return {};
      const style: ViewStyle = {
        borderColor: date.getDate() === selectedDate.getDate() ? colors.text : 'transparent',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderWidth: 2,
        borderTopWidth: 0,
      };
      return style;
    };
    return (
      <Pressable onPress={() => onPress(date)} style={[style.slotContainer, selectedDateStyle()]}>
        <View style={style.dateSlot}>
          <Text fontSize={18} color={isToday ? colors.cyan : colors.text} weight="bold">
            {moment(date).format('DD')}
          </Text>
        </View>
      </Pressable>
    );
  },
  (prev, next) =>
    prev.id === next.id && prev.selectedDate?.getDate() === next.selectedDate?.getDate()
);

export default HomseScreenHeader;
