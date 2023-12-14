import { useValue } from '@shopify/react-native-skia';
import { useColors } from '@Theme';
import React, { useCallback, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Text } from '../../Components/atoms';
import { LoadingOnnet } from '../../Components/atoms/LoadingOnnet/LoadingOnnet';
import data from '../../Components/molecules/Story/types';
import EventItem from './components/EventItem/EventItem';
import screenStyles from './FeedScreen.styles';

export const FeedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollYOffset = useSharedValue<number>(0);
  const colors = useColors();
  const pullDownValue = useValue(0);
  const styles = screenStyles(colors, insets);

  const onScroll = useCallback((e: any) => {
    scrollYOffset.value = e.nativeEvent.contentOffset.y;
    if (e.nativeEvent.contentOffset.y < 0) {
      pullDownValue.current = Math.min(e.nativeEvent.contentOffset.y / -190, 1);
    } else {
      pullDownValue.current = 0;
    }
  }, []);

  const onHeader = useCallback(({ nativeEvent: { layout } }: any) => {
    setHeaderHeight(layout.height);
  }, []);

  const renderFeed = useCallback(
    ({ item }: any) => {
      return (
        <EventItem
          scrollYOffset={scrollYOffset}
          headerHeight={headerHeight}
          key={item.index}
          data={item}
        />
      );
    },
    [headerHeight]
  );

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.screen}>
      <View onLayout={onHeader} style={styles.header}>
        <Text fontSize={32} weight="bold">
          FEED <Text fontSize={10}>BETA</Text>
        </Text>
        <LoadingOnnet progress={pullDownValue} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        decelerationRate={'fast'}
        onScroll={onScroll}
        data={data}
        snapToInterval={Math.round(height * 0.6) + 48}
        renderItem={renderFeed}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
