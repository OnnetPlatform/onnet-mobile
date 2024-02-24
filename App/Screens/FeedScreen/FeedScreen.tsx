import { Separator, Text } from '@Atoms';
import { LoadingOnnet } from '@Atoms/LoadingOnnet/LoadingOnnet';
import { useBottomSheet } from '@Context/BottomSheet';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { FeedItem } from './components/FeedItem/FeedItem';
import screenStyles from './FeedScreen.styles';
import { useFeedData } from './utils';
import { FlashList } from '@shopify/flash-list';

export const FeedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data, getData } = useFeedData();
  const { height } = useWindowDimensions();
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollYOffset = useSharedValue<number>(0);
  const colors = useColors();
  const pullDownValue = useSharedValue(0);
  const styles = screenStyles(colors, insets);
  const { showBottomSheet } = useBottomSheet();
  const navigation = useNavigation();
  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollYOffset.value = e.nativeEvent.contentOffset.y;
    if (e.nativeEvent.contentOffset.y < 0) {
      pullDownValue.value = Math.min(e.nativeEvent.contentOffset.y / -190, 1);
    } else if (e.nativeEvent.contentOffset.y === 0) {
      if (pullDownValue.value > 0) {
        pullDownValue.value = withSpring(1, { damping: 10 });
        setTimeout(() => {
          pullDownValue.value = withSpring(0, { damping: 100 });
        }, 500);
        getData();
      }
    } else {
      pullDownValue.value = 0;
    }
  }, []);

  const onHeader = useCallback(({ nativeEvent: { layout } }: any) => {
    setHeaderHeight(layout.height);
  }, []);

  const onItemPressed = useCallback((item: any) => {
    // @ts-ignore
    if (item.__typename === 'Bulletin') navigation.navigate('LiveAnnouncement');
  }, []);

  const renderFeed = useCallback(
    ({ item }: any) => {
      return (
        <Pressable onPress={() => onItemPressed(item)}>
          <FeedItem item={item} />
        </Pressable>
      );
    },
    [headerHeight]
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.screen}>
      <View onLayout={onHeader} style={styles.header}>
        <Text fontSize={32} weight="bold">
          FEED <Text fontSize={10}>BETA</Text>
        </Text>
        <LoadingOnnet progress={pullDownValue} />
      </View>
      <FlashList
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        data={data}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ padding: 16, paddingBottom: headerHeight }}
        renderItem={renderFeed}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
