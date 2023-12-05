import { useColors } from '@Theme';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { Text } from '../../../../atoms';
import DatePicker from '../../../DatePicker/DatePicker';
import styles from './Slot.styles';
import { LayoutInsets, SlotProps } from './types';

export const Slot: React.FC<SlotProps> = React.memo(
  ({ width, date, month }) => {
    const colors = useColors();
    const [layout, setLayout] = useState<LayoutInsets | undefined>();
    const slotRef = useRef<View>(null);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const isCurrentMonth = month === date.getMonth();
    const isToday = isCurrentMonth && new Date().getDate() === date.getDate();

    const opacity: ViewStyle = {
      opacity: isCurrentMonth ? 1 : 0.4,
    };
    const border: ViewStyle = useMemo(
      () => ({
        borderWidth: isToday && isCurrentMonth ? 2 : 0,
        borderColor: colors.text,
        borderRadius: width / 2,
      }),
      [isCurrentMonth, isCurrentMonth]
    );
    const backgroundColor: ViewStyle = {
      backgroundColor: showDatePicker ? colors.text : 'transparent',
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
          onPress={() => setShowDatePicker(!showDatePicker)}>
          <View
            ref={slotRef}
            style={[styles(width).slot, opacity, border, backgroundColor]}>
            <Text
              color={showDatePicker ? colors.secondaryBackground : colors.text}
              weight={'bold'}>
              {date.getDate()}
            </Text>
          </View>
        </Pressable>
        <DatePicker
          onRequestClose={() => setShowDatePicker(false)}
          layout={layout}
          visible={showDatePicker}
        />
      </>
    );
  },
  (next, prev) => next.date.getDate() === prev.date.getDate()
);

export default Slot;
