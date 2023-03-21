import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { createCalendar } from '../../helpers';
import Slot from '../Slot';
import { CalendarSectionProps } from './types';
import styles from './CalendarSection.styles';

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  section: { month, year, width },
}) => {
  const dates = useMemo(() => createCalendar(month, year), []);
  const renderSlots = ({ item }: { item: Date }) => (
    <Slot date={item} month={month} width={width / 7} />
  );

  return (
    <View style={{ width }}>
      <FlatList
        numColumns={7}
        contentContainerStyle={styles.container}
        data={dates}
        renderItem={renderSlots}
      />
    </View>
  );
};
export default CalendarSection;
