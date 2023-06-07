import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View, useColorScheme } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Text } from '../../../../Components/atoms';
import { SectionsList } from '../../../../Components/atoms/SectionsList';
import { useColors } from '../../../../Theme';
import EventItem from '../EventItem/EventItem';
import HomeScreenHeader from '../HomeScreenHeader';
import { useFakerData } from './Data';
import styles, { withColors } from './EventsList.styles';

export const EventsList: React.FC<{
  onCreatePressed(): void;
}> = ({ onCreatePressed }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { eventsData } = useFakerData();
  const colors = useColors();
  const colorStyles = withColors(colors);
  const animatedHeaderValue = useSharedValue(0);
  const isDark = useColorScheme() === 'dark';
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    animatedHeaderValue.value = selectedDate ? 0 : e.nativeEvent.contentOffset.y;
  };
  return (
    <>
      <HomeScreenHeader
        animatedHeaderValue={animatedHeaderValue}
        onCreatePressed={onCreatePressed}
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
      />
      <SectionsList
        showsVerticalScrollIndicator={false}
        scrollToDate={selectedDate}
        bounces={true}
        data={eventsData}
        scrollEventThrottle={0.3}
        onScroll={onScroll}
        contentContainerStyle={[styles.container]}
        renderItem={({ item }) => <EventItem event={item} />}
        renderSectionHeader={({ section }: any) => {
          return (
            <BlurView
              blurAmount={1}
              blurType={isDark ? 'thinMaterialDark' : 'light'}
              style={colorStyles.header}>
              <View
                style={{ width: 6, height: 6, backgroundColor: colors.text, borderRadius: 12 }}
              />
              <Text
                style={{ marginLeft: 8, textTransform: 'uppercase' }}
                weight="semibold"
                fontSize={12}>
                {section.title}
              </Text>
            </BlurView>
          );
        }}
      />
    </>
  );
};

export default EventsList;
