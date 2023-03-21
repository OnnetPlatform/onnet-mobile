import moment from 'moment';
import React, { useState } from 'react';
import { View, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Text } from '../../atoms';
import { CalendarSection } from './components';
import { WEEK, MONTHS } from './helpers';
import { CalendarProps } from './types';
import styles from './Calendar.styles';

export const Calendar: React.FC<CalendarProps> = ({ width }) => {
  const [index, setIndex] = useState<number>(0);
  const now = new Date();

  const onScroll = ({
    nativeEvent: {
      contentOffset: { x },
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => setIndex(Math.round(x / width));

  return (
    <View>
      <Text fontSize={24} weight={'bold'} style={{ textAlign: 'center', marginBottom: 8 }}>
        {moment(new Date(now.getFullYear(), MONTHS[index])).format('MMMM')}
      </Text>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={WEEK}
        renderItem={({ item }) => (
          <View style={styles(width).text}>
            <Text weight={'light'}>{item[0]}</Text>
          </View>
        )}
      />
      <FlatList
        snapToInterval={width}
        decelerationRate={'fast'}
        data={MONTHS}
        scrollEventThrottle={0.2}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        horizontal
        renderItem={({ item }) => (
          <CalendarSection
            section={{
              month: item,
              year: now.getFullYear(),
              width,
            }}
          />
        )}
      />
    </View>
  );
};
