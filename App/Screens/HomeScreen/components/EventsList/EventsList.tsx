import { BlurView } from '@react-native-community/blur';
import React, { useMemo } from 'react';
import { View, ViewStyle, FlatList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../../../Components/atoms';
import { SectionsList } from '../../../../Components/atoms/SectionsList/SectionsList';
import { useColors } from '../../../../Theme';
import EventItem from '../EventItem/EventItem';
import HomeScreenHeader from '../HomeScreenHeader';
import { useFakerData } from './Data';
import styles, { withColors } from './EventsList.styles';

export const EventsList: React.FC<{
  onCreatePressed(): void;
}> = ({ onCreatePressed }) => {
  const { eventsData } = useFakerData();
  const colors = useColors();
  const colorStyles = withColors(colors);
  const insets = useSafeAreaInsets();
  const animatedHeaderValue = useSharedValue(0);

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      paddingBottom: insets.bottom + 300,
    }),
    [insets.bottom]
  );

  return (
    <>
      <HomeScreenHeader
        animatedHeaderValue={animatedHeaderValue}
        onCreatePressed={onCreatePressed}
      />
      <SectionsList
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        bounces={true}
        data={eventsData}
        contentContainerStyle={[containerStyle, styles.container]}
        ItemSeparatorComponent={() => <View style={styles.spacer} />}
        renderItem={({ item }) => <EventItem event={item} />}
        renderSectionHeader={({ section }: any) => {
          return (
            <BlurView blurAmount={20} style={colorStyles.header}>
              <Icon name={'calendar-outline'} />
              <Text style={{ marginLeft: 8 }} weight="bold" fontSize={18}>
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
