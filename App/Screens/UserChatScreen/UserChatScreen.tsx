import { HeaderLoader, SectionsList } from '@Atoms';
import { MessagingSelector } from '@Khayat/Redux/Selectors/MessagingSelector';
import ChatEmptyState from '@Molecules/ChatEmptyState';
import { BOTTOM_BAR_HEIGHT } from '@Theme';
import React, { useCallback, useMemo, useRef } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { Icon, Separator, Text } from '../../Components/atoms';
import Avatar from '../../Components/atoms/Avatar/Avatar';
import { useRoomMessages } from '../../Database/Hooks/useRealmMessages';
import { MessageHeader } from './components';
import { FormattedMessages } from './components/MessageItem/utils';
import styles from './UserChatScreen.styles';
import MessageInputProvider from '../../Provider/MessageInputProvider';
import { TextMessage } from './components/TextMessage/TextMessage';
import { FlashList } from '@shopify/flash-list';
import { useAppNavigation } from '@Hooks/useAppNavigation';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useStyles } from '@Theme/Colors';

export const UserChatScreen: React.FC = ({ route }: any) => {
  const { user } = route.params;
  const ref = useRef<FlashList<any>>(null);
  const msgs: FormattedMessages[] = useRoomMessages(user);
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const headerStyle: ViewStyle = useMemo(
    () => ({ paddingTop: insets.top }),
    [insets]
  );
  const { screenStyle } = useStyles();
  const { isConnected } = useSelector(MessagingSelector);
  const { state, height } = useAnimatedKeyboard();
  let scroll = false;
  const animatedHeight = useAnimatedStyle(() => ({
    height: [1, 2].includes(state.value) ? height.value : 0,
  }));
  const ListEmptyComponent = useCallback(() => {
    return <ChatEmptyState username={user.first_name} />;
  }, []);

  return (
    <SafeAreaView style={screenStyle} edges={['bottom', 'left', 'right']}>
      <View style={[styles.header, headerStyle]}>
        <Pressable
          style={styles.headerBack}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-ios-back'} />
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('ProfileScreen', { id: user.user })
          }
          style={[styles.row, { alignItems: 'center' }]}>
          <Avatar avatar={user.avatar} isActive={user.active} />
          <Separator horizontal />
          <Text weight="bold" fontSize={16}>
            {user.first_name} {user.last_name}
          </Text>
        </Pressable>
      </View>
      {isConnected ? null : <HeaderLoader />}
      <SectionsList
        data={msgs}
        onScroll={() => (scroll = true)}
        onScrollAnimationEnd={() => (scroll = false)}
        SectionListHeaderComponent={MessageHeader}
        ListFooterComponent={<Animated.View style={animatedHeight} />}
        onContentSizeChange={() => {
          if (ref.current && msgs.length > 1 && !scroll)
            ref.current.scrollToEnd();
        }}
        SectionListItemComponent={TextMessage}
        contentContainerStyle={{ paddingBottom: BOTTOM_BAR_HEIGHT + 44 }}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        ref={ref}
      />
      <MessageInputProvider user={user} />
    </SafeAreaView>
  );
};

export default UserChatScreen;
