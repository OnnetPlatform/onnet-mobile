import { Text } from '@Atoms';
import { useCalendarContext } from '@Molecules/Calendar/CalendarContext/CalendarContext';
import DatePicker from '@Molecules/DatePicker/DatePicker';
import { useColors } from '@Theme';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import styles from './Slot.styles';
import { LayoutInsets, SlotProps } from './types';

export const Slot: React.FC<SlotProps> = React.memo(
  ({ width, date, month }) => {
    const colors = useColors();
    const [layout, setLayout] = useState<LayoutInsets | undefined>();
    const slotRef = useRef<View>(null);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const isCurrentMonth = month === date.getMonth();
    const isToday =
      month == new Date().getMonth() && new Date().getDate() === date.getDate();
    const { date: calendarDate, setDate } = useCalendarContext();
    const isSelected =
      calendarDate.getDate() === date.getDate() &&
      calendarDate.getMonth() === date.getMonth();

    const opacity: ViewStyle = {
      opacity: isCurrentMonth ? 1 : 0.4,
    };
    const border: ViewStyle = useMemo(
      () => ({
        borderWidth: isToday && isCurrentMonth ? 2 : 0,
        borderColor: colors.text,
        borderRadius: width / 2,
      }),
      [isCurrentMonth]
    );
    const backgroundColor: ViewStyle = {
      backgroundColor: isSelected ? colors.text : 'transparent',
    };
    useEffect(() => {
      if (showDatePicker) {
        slotRef.current?.measure((x, y, w, height, pageX, pageY) =>
          setLayout({ x, y, height, pageX, pageY, width: w })
        );
      }
    }, [showDatePicker, slotRef.current]);

    return (
      <>
        <Pressable
          disabled={!isCurrentMonth}
          onPress={() => {
            setDate(date);
            setShowDatePicker(!showDatePicker);
          }}>
          <View
            ref={slotRef}
            style={[styles(width).slot, opacity, border, backgroundColor]}>
            <Text
              color={isSelected ? colors.secondaryBackground : colors.text}
              weight={'bold'}>
              {date.getDate()}
            </Text>
          </View>
        </Pressable>
        <DatePicker
          onRequestClose={() => setShowDatePicker(false)}
          layout={layout}
          visible={showDatePicker}
          onTimeChange={({ hour, minutes }) => {
            const newDate = new Date(calendarDate);
            newDate.setHours(hour);
            newDate.setMinutes(minutes);
            setDate(newDate);
            setShowDatePicker(false);
          }}
        />
      </>
    );
  },
  (next, prev) => next.date.getDate() === prev.date.getDate()
);

export default Slot;
