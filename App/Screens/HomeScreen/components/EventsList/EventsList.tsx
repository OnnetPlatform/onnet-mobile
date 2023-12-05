import { Event } from '@Khayat/Graphql/Events/types';
import { EventSelector } from '@Khayat/Redux/Selectors/EventSelector';
import { useScrollToTop } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  SectionListRenderItem,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { useSelector } from 'react-redux';

import EventItem from '../EventItem/EventItem';
import HomeScreenHeader from '../HomeScreenHeader';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './EventsList.styles';

const getItemLayout: any = sectionListGetItemLayout({
  getItemHeight: () => 50,
  getSeparatorHeight: () => 0,
  getSectionHeaderHeight: () => 30,
  getSectionFooterHeight: () => 0,
});

export const EventsList: React.FC<{
  onCreatePressed(): void;
}> = ({ onCreatePressed }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { events } = useSelector(EventSelector);
  const animatedHeaderValue = useSharedValue(0);
  const ref = useRef<SectionList<any, any>>(null);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    animatedHeaderValue.value = selectedDate
      ? 0
      : e.nativeEvent.contentOffset.y;
  };

  const renderHeader = useCallback(({ section }: any) => {
    return <SectionHeader key={section.title} section={section} />;
  }, []);

  const onDateSelected = useCallback(
    (scrollToDate: Date) => {
      setSelectedDate(scrollToDate);
      if (ref.current) {
        const today = new Date();
        const index = events.findIndex((item) => item.day === today.getDate());

        if (index > -1) {
          setTimeout(() => {
            ref.current?.scrollToLocation({
              sectionIndex: index,
              animated: true,
              itemIndex: 0,
            });
          }, 100);
        }
      }
    },
    [ref, events]
  );

  useScrollToTop(ref);

  const renderItem: SectionListRenderItem<Event, any> = useCallback(
    ({ item }) => <EventItem key={item.id} event={item} />,
    []
  );

  useEffect(() => {
    if (ref.current && events.length > 0) {
      const today = new Date();
      const index = events.findIndex((item) => item.day === today.getDate());
      setTimeout(() => {
        ref.current?.scrollToLocation({
          sectionIndex: index,
          animated: true,
          itemIndex: 0,
        });
      }, 100);
    }
  }, [events, ref]);

  return (
    <>
      <HomeScreenHeader
        animatedHeaderValue={animatedHeaderValue}
        onCreatePressed={onCreatePressed}
        selectedDate={selectedDate}
        onDateSelected={onDateSelected}
      />
      <SectionList
        showsVerticalScrollIndicator={false}
        bounces={true}
        ref={ref}
        sections={events}
        scrollEventThrottle={0.5}
        onScroll={onScroll}
        onEndReachedThreshold={0.8}
        contentContainerStyle={[styles.container]}
        keyExtractor={(item) => item.date}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={20}
        updateCellsBatchingPeriod={100}
        renderSectionHeader={renderHeader}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
    </>
  );
};

export default EventsList;
