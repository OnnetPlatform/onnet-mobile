import React, { useMemo } from 'react';
import { View, ViewStyle, FlatList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventItem from '../EventItem/EventItem';
import HomeScreenHeader from '../HomeScreenHeader';
import { useFakerData } from './Data';
import styles from './EventsList.styles';

export const EventsList: React.FC<{
  onCreatePressed(): void;
}> = ({ onCreatePressed }) => {
  const insets = useSafeAreaInsets();
  const animatedHeaderValue = useSharedValue(0);
  const { eventsData } = useFakerData();

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingBottom: insets.bottom + 300,
    }),
    [insets.bottom]
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => (
        <HomeScreenHeader
          animatedHeaderValue={animatedHeaderValue}
          onCreatePressed={onCreatePressed}
        />
      )}
      contentContainerStyle={[containerStyle, styles.container]}
      ItemSeparatorComponent={() => <View style={styles.spacer} />}
      data={eventsData}
      renderItem={({ item }) => <EventItem event={item} />}
    />
  );
};

export default EventsList;
