import moment from 'moment';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';

import { Text } from '../../atoms';
import styles from './Calendar.styles';
import { CalendarSection } from './components';
import { MONTHS, WEEK } from './helpers';
import { CalendarProps } from './types';

export const Calendar: React.FC<CalendarProps> = React.memo(
  ({ width }) => {
    const [index, setIndex] = useState<number>(0);
    const now = new Date();
    const onScroll = ({
      nativeEvent: {
        contentOffset: { x },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) =>
      setIndex(Math.round(x / width));

    const renderWeekDays = useCallback(
      ({ item }: any) => (
        <View style={styles(width).text}>
          <Text weight={'light'}>{item[0]}</Text>
        </View>
      ),
      []
    );

    const renderMonths = useCallback(
      ({ item }: any) => (
        <CalendarSection
          section={{
            month: item,
            year: now.getFullYear(),
            width,
          }}
        />
      ),
      []
    );

    return (
      <View>
        <Text weight="bold" fontSize={16} style={styles(width).currentMonth}>
          {moment(new Date(now.getFullYear(), MONTHS[index])).format('MMMM')}
        </Text>
        <FlatList
          horizontal
          scrollEnabled={false}
          data={WEEK}
          renderItem={renderWeekDays}
        />
        <FlatList
          snapToInterval={width}
          decelerationRate={'fast'}
          data={MONTHS}
          scrollEventThrottle={0.2}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          horizontal
          renderItem={renderMonths}
        />
      </View>
    );
  },
  (p, n) => p.width === n.width
);
export default Calendar;
