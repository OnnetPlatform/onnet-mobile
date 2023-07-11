import React, { useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { Blur, Icon, Text } from '../../Components/atoms';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import EventItem from './components/EventItem/EventItem';
import { useSharedValue } from 'react-native-reanimated';
import data from '../../Components/molecules/Story/types';
import { useColors } from '../../Theme';
import { LoadingOnnet } from '../../Components/atoms/LoadingOnnet/LoadingOnnet';
import { useValue } from '@shopify/react-native-skia';

export const FeedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollYOffset = useSharedValue<number>(0);
  const colors = useColors();
  const pullDownValue = useValue(0);
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={{ flex: 1, flexGrow: 1, backgroundColor: colors.background }}>
      <View
        onLayout={({ nativeEvent: { layout } }) => setHeaderHeight(layout.height)}
        style={{
          paddingTop: insets.top + 8,
          padding: 22,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text fontSize={32} weight="bold">
          FEED <Text fontSize={10}>BETA</Text>
        </Text>
        <LoadingOnnet progress={pullDownValue} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        decelerationRate={'fast'}
        onScroll={(e) => {
          scrollYOffset.value = e.nativeEvent.contentOffset.y;
          if (e.nativeEvent.contentOffset.y < 0) {
            pullDownValue.current = Math.min(e.nativeEvent.contentOffset.y / -190, 1);
          } else {
            pullDownValue.current = 0;
          }
        }}
        data={data}
        snapToInterval={Math.round(height * 0.6) + 48}
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
