import { HeaderLoader } from '@Atoms';
import { MessagingSelector } from '@Khayat/Redux/Selectors/MessagingSelector';
import ChatEmptyState from '@Molecules/ChatEmptyState';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Pressable,
  SectionList,
  SectionListRenderItem,
  View,
} from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { useSelector } from 'react-redux';

import { Icon, Separator, Text } from '../../Components/atoms';
import Avatar from '../../Components/atoms/Avatar/Avatar';
import { useRoomMessages } from '../../Database/Hooks/useRealmMessages';
import { useKeyboard } from '../../Hooks/useKeyboard';
import { MessageItem } from './components';
import { FormattedMessages } from './components/MessageItem/utils';
import styles, { contentStyle } from './UserChatScreen.styles';
import MessageInputProvider from '../../Provider/MessageInputProvider';
import moment from 'moment';
import { humanizeDate } from '@Utils/dateFormatter';
import { MarkdownTextInput } from '@expensify/react-native-live-markdown';
import { useMarkdownStyles } from '@Utils/useMarkdownStyles';

const getItemLayout = sectionListGetItemLayout({
  getItemHeight: () => 50,
  getSeparatorHeight: () => 0,
  getSectionHeaderHeight: () => 30,
  getSectionFooterHeight: () => 0,
});

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export const UserChatScreen: React.FC = ({ route }: any) => {
  const { user } = route.params;
  const msgs: FormattedMessages[] = useRoomMessages(user);
  const colors = useColors();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const withColors = styles(colors, insets);
  const { height, state } = useAnimatedKeyboard();
  const ref = useRef<SectionList>();
  const sheetInputHeight = useSharedValue<number>(0);

  const { isConnected } = useSelector(MessagingSelector);
  const { isOpen } = useKeyboard();
  const markdownStyle = useMarkdownStyles();

  const ListEmptyComponent = useCallback(() => {
    return <ChatEmptyState username={user.first_name} />;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current && msgs.length > 0) {
        ref.current.scrollToLocation({
          sectionIndex: msgs.length - 1,
          itemIndex: msgs[msgs.length - 1].data.length - 1,
        });
      }
    }, msgs.length);
  }, [msgs, ref, ref.current]);

  const animatedHeight = useDerivedValue(
    () => height.value,
    [state.value, sheetInputHeight.value, height.value]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: [1, 2].includes(state.value)
            ? withSpring(-animatedHeight.value)
            : 0,
        },
      ],
      zIndex: -1,
    };
  }, [height.value, state.value]);

  const renderMessages: SectionListRenderItem<{
    message: string;
    createdAt: string;
  }> = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          marginLeft: 12,
          paddingRight: 22,
        }}>
        <MarkdownTextInput
          style={{ width: '100%', color: colors.text }}
          multiline
          scrollEnabled={false}
          markdownStyle={markdownStyle}
          editable={false}>
          {item.message}
        </MarkdownTextInput>
        <Separator />
        <Text fontSize={12} style={{ opacity: 0.4 }} textAlign="right">
          {humanizeDate(new Date(item.createdAt))}{' '}
          {moment(new Date(item.createdAt)).format('hh:mm A')}
        </Text>
        <Separator />
      </View>
    );
  };

  const renderSectionHeader = useCallback((item: any) => {
    return <MessageItem index={Math.random()} item={item.section} />;
  }, []);

  return (
    <SafeAreaView style={withColors.page} edges={['bottom', 'left', 'right']}>
      <View style={withColors.header}>
        <Pressable
          style={withColors.headerBack}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-ios-back'} />
        </Pressable>
        <Pressable
          // @ts-ignore
          onPress={() => navigation.navigate('ProfileScreen')}
          style={[withColors.row, { alignItems: 'center' }]}>
          <Avatar avatar={user.avatar} isActive={user.isActive} />
          <Separator horizontal />
          <Text weight="bold" fontSize={16}>
            {user.first_name} {user.last_name}
          </Text>
        </Pressable>
      </View>
      {isConnected ? null : <HeaderLoader />}
      <AnimatedSectionList
        // @ts-ignore
        ref={ref}
        sections={msgs}
        // @ts-ignore
        getItemLayout={getItemLayout}
        scrollEnabled={msgs.length > 0}
        contentContainerStyle={contentStyle(isOpen)}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        style={animatedStyle}
        ListEmptyComponent={ListEmptyComponent}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={Separator}
        // @ts-ignore
        renderItem={renderMessages}
      />
      <MessageInputProvider user={user} />
    </SafeAreaView>
  );
};

export default UserChatScreen;
