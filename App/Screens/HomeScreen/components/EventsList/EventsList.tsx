import React, { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import EventItem from '../EventItem/EventItem';
import HomeScreenHeader from '../HomeScreenHeader';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { useSortedData } from './Data';
import SectionsList from '@Atoms/SectionsList';
import styles from './EventsList.styles';
import { FlashList } from '@shopify/flash-list';
import { useScrollToTop } from '@react-navigation/native';

export const EventsList: React.FC<{
  onCreatePressed(): void;
}> = ({ onCreatePressed }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const sorted = useSortedData();
  const animatedHeaderValue = useSharedValue(0);
  const ref = useRef<FlashList<any>>(null);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    animatedHeaderValue.value = selectedDate
      ? 0
      : e.nativeEvent.contentOffset.y;
  };

  // @ts-ignore
  useScrollToTop(ref);

  return (
    <>
      <HomeScreenHeader
        animatedHeaderValue={animatedHeaderValue}
        onCreatePressed={onCreatePressed}
        selectedDate={selectedDate}
        onDateSelected={(date) => {
          const index = sorted
            .filter((item) => typeof item !== 'object')
            .find((item) => {
              return (
                new Date(+item).getDate() === date.getDate() &&
                new Date(+item).getMonth() === date.getMonth()
              );
            });
          setSelectedDate(date);
          ref.current?.scrollToIndex({
            index: sorted.indexOf(index || 0),
            animated: true,
          });
        }}
      />
      <SectionsList
        data={sorted}
        SectionListHeaderComponent={SectionHeader}
        SectionListItemComponent={EventItem}
        onScroll={onScroll}
        contentContainerStyle={styles.container}
        ref={ref}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default EventsList;
