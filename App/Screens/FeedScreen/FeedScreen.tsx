import React, { useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { Blur, Icon, Text } from '../../Components/atoms';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import EventItem from './components/EventItem/EventItem';
import { useSharedValue } from 'react-native-reanimated';
import data from '../../Components/molecules/Story/types';

export const FeedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollYOffset = useSharedValue<number>(0);
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1, flexGrow: 1 }}>
      <FlatList
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollYOffset.value = e.nativeEvent.contentOffset.y;
        }}
        ListHeaderComponent={
          <Blur
            onLayout={({ nativeEvent: { layout } }) => setHeaderHeight(layout.height)}
            style={{
              paddingTop: insets.top,
              padding: 22,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text fontSize={32} weight="bold">
              FEED <Text fontSize={12}>beta</Text>
            </Text>
            <Icon name={'search-outline'} />
          </Blur>
        }
        data={data}
        snapToInterval={height * 0.6 + 8}
        contentContainerStyle={{ paddingBottom: insets.top }}
        // ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <EventItem
            scrollYOffset={scrollYOffset}
            headerHeight={headerHeight}
            key={item.index}
            data={item}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
