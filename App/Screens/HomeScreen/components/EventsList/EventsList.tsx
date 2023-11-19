import { useScrollToTop } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import EventItem from '../EventItem/EventItem';
import HomeScreenHeader from '../HomeScreenHeader';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { useFakerData } from './Data';
import styles from './EventsList.styles';

export const EventsList: React.FC<{
  onCreatePressed(): void;
}> = ({ onCreatePressed }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { data, nextPage } = useFakerData();
  const animatedHeaderValue = useSharedValue(0);
  const ref = useRef<SectionList<any, any>>(null);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    animatedHeaderValue.value = selectedDate
      ? 0
      : e.nativeEvent.contentOffset.y;
  };

  const renderHeader = useCallback(({ section }: any) => {
    return <SectionHeader section={section} />;
  }, []);

  useScrollToTop(ref);

  return (
    <>
      <HomeScreenHeader
        animatedHeaderValue={animatedHeaderValue}
        onCreatePressed={onCreatePressed}
        selectedDate={selectedDate}
        onDateSelected={(scrollToDate) => {
          setSelectedDate(scrollToDate);
          if (ref.current) {
            const index = data.findIndex(
              (date: any) =>
                date.title === moment(scrollToDate).format('dddd, MMMM Do')
            );
            if (index > -1) {
              ref.current.scrollToLocation({
                sectionIndex: index,
                animated: true,
                itemIndex: 0,
              });
            }
          }
        }}
      />
      <SectionList
        showsVerticalScrollIndicator={false}
        bounces={true}
        ref={ref}
        sections={data}
        scrollEventThrottle={0.5}
        onScroll={onScroll}
        onEndReached={() => {
          setTimeout(() => {
            nextPage();
          }, 100);
        }}
        onEndReachedThreshold={0.8}
        contentContainerStyle={[styles.container]}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <EventItem event={item} />}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={20}
        updateCellsBatchingPeriod={100}
        renderSectionHeader={renderHeader}
      />
    </>
  );
};

export default EventsList;
