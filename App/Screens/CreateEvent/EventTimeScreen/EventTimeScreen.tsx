import Collapsible from '@Atoms/Collapsible';
import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useEventContext } from '@Context/EventContext/EventContext';
import { CalendarProvider } from '@Molecules/Calendar/CalendarContext';
import { useColors } from '@Theme';
import { humanizeDate } from '@Utils/dateFormatter';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';

import NestedScreenHeader from '../Components/NestedScreenHeader/NestedScreenHeader';
import useSave from '../Hooks/useSave';
import witColors from './EventTime.styles';

export const EventTimeScreen: React.FC = () => {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const styles = witColors(colors);
  const { event } = useEventContext();

  const [date, setDate] = useState<number>(event.date);

  const { onSavePressed, onBackPressed } = useSave({
    key: 'date',
    value: date,
  });
  if (!event) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.screen}>
      <NestedScreenHeader
        title={'Date & Time'}
        onSavePressed={onSavePressed}
        onBackPressed={onBackPressed}
      />
      <View style={styles.body}>
        <Pressable onPress={() => setCollapsed(!collapsed)} style={styles.item}>
          <View style={styles.row}>
            <Icon name={'calendar-outline'} />
            <Separator horizontal size={'md'} />
            <Text fontSize={18} weight="bold">
              Date & Time
            </Text>
          </View>
          <Icon name={`arrow-ios-${collapsed ? 'down' : 'up'}ward-outline`} />
        </Pressable>

        <Collapsible expanded={!collapsed}>
          <Separator size={'md'} />

          <Text weight="bold" fontSize={22} style={styles.dateTitle}>
            {humanizeDate(new Date(date))}
          </Text>
          <Separator size={'md'} />
          <CalendarProvider
            width={width - 44}
            onDateChange={(selectedDate) => {
              setDate(selectedDate.getTime());
            }}
          />
        </Collapsible>
      </View>
    </View>
  );
};
export default EventTimeScreen;
