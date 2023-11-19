import { HeaderLoader } from '@Atoms';
import { MessagingCreators } from '@Khayat/Redux/Actions/MessagingActions';
import { MessagingSelector } from '@Khayat/Redux/Selectors/MessagingSelector';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, SectionList, View } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';

import { UploadedImage } from '../../../types';
import { Icon, Separator, Text } from '../../Components/atoms';
import Avatar from '../../Components/atoms/Avatar/Avatar';
import { useRoomMessages } from '../../Database/Hooks/useRealmMessages';
import { useKeyboard } from '../../Hooks/useKeyboard';
import { useColors } from '../../Theme';
import { MessageInput, MessageItem } from './components';
import { FormattedMessages } from './components/MessageItem/utils';
import styles, { contentStyle } from './UserChatScreen.styles';

const getItemLayout = sectionListGetItemLayout({
  getItemHeight: () => 50,
  getSeparatorHeight: () => 0,
  getSectionHeaderHeight: () => 30,
  getSectionFooterHeight: () => 0,
});

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
export const UserChatScreen: React.FC = ({ route }: any) => {
  const { user } = route.params;
  const [message, setMessage] = useState<string>('');
  const msgs: FormattedMessages[] = useRoomMessages(user);
  const colors = useColors();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const withColors = styles(colors, insets);
  const { height, state } = useAnimatedKeyboard();
  const ref = useRef<SectionList>();
  const sheetInputHeight = useSharedValue<number>(0);
  const [attachedImage, setAttachedImage] = useState<
    UploadedImage | undefined
  >();
  const dispatch = useDispatch();
  let typingSent = useRef<boolean>(false);
  const { isConnected } = useSelector(MessagingSelector);
  const { isOpen } = useKeyboard();
  const onSend = useCallback(() => {
    dispatch(
      MessagingCreators.sendMessage({
        message,
        client: { user_id: user.user_id },
      })
    );
    setMessage('');
    setAttachedImage(undefined);
  }, [message]);

  const sendTypingEvent = () => {
    typingSent.current = true;
    dispatch(MessagingCreators.typing(user));
  };

  const sendTypingStoppedEvent = () => {
    typingSent.current = false;
    dispatch(MessagingCreators.typingStopped(user));
  };

  useEffect(() => {
    if (!typingSent.current && message) {
      sendTypingEvent();
    }
    const typingStoppedTimeout = setTimeout(sendTypingStoppedEvent, 500);

    return () => {
      clearTimeout(typingStoppedTimeout);
    };
  }, [message, typingSent.current]);

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
          <View>
            <Avatar avatar={user.avatar} isActive={user.isActive} />
          </View>
          <Text weight="bold" fontSize={16}>
            {user.name}
          </Text>
        </Pressable>
      </View>
      {isConnected ? null : <HeaderLoader />}
      <AnimatedSectionList
        // @ts-ignore
        ref={ref}
        ItemSeparatorComponent={Separator}
        // @ts-ignore
        sections={msgs}
        // @ts-ignore
        getItemLayout={getItemLayout}
        contentContainerStyle={contentStyle(isOpen)}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        style={animatedStyle}
        SectionSeparatorComponent={Separator}
        renderSectionHeader={(item) => {
          // @ts-ignore
          return <MessageItem index={Math.random()} item={item.section} />;
        }}
        renderItem={({ item, index }) => {
          return (
            <Text key={index} style={{ marginLeft: 48, paddingRight: 22 }}>
              {item as any}
            </Text>
          );
        }}
      />
      <MessageInput
        sheetInputHeight={sheetInputHeight}
        onSend={onSend}
        value={message}
        onChangeText={setMessage}
        user={user}
        onAttachedImage={setAttachedImage}
        attachedImage={attachedImage}
        onEmojiPressed={(emoji) => setMessage((msg) => msg + emoji.emoji)}
      />
    </SafeAreaView>
  );
};

export default UserChatScreen;
