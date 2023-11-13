import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { UploadedImage } from '../../../types';
import { Icon, Text } from '../../Components/atoms';
import Avatar from '../../Components/atoms/Avatar/Avatar';
import { useSocketContext } from '../../Context/SocketContext/SocketContext';
import { useRoomMessages } from '../../Database/Hooks/useRealmMessages';
import { useChat } from '../../Hooks/useChat';
import { useColors } from '../../Theme';
import { MessageInput, MessageItem } from './components';
import styles from './UserChatScreen.styles';

export const UserChatScreen: React.FC = ({ route }: any) => {
  const { user } = route.params;
  const { sendDirectMessage, sendStoppedTypingEvent, sendTypingEvent } = useChat(user);
  const [message, setMessage] = useState<string>('');
  const msgs = useRoomMessages(user);
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { setOpponent } = useSocketContext();
  const withColors = styles(colors, insets);
  const sheetInputHeight = useSharedValue<number>(0);
  const [attachedImage, setAttachedImage] = useState<UploadedImage | undefined>();
  const { height, state } = useAnimatedKeyboard();

  const onSend = useCallback(() => {
    sendDirectMessage(
      {
        message,
        attachment: { gallery: attachedImage ? [attachedImage] : [] },
      },
      () => {
        setMessage('');
        setAttachedImage(undefined);
      }
    );
  }, [message]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      paddingVertical: withTiming(
        state.value === 1 || state.value === 2
          ? sheetInputHeight.value + height.value - 70
          : sheetInputHeight.value,
        {
          duration: 50,
          easing: Easing.linear,
        }
      ),
    }),
    [state]
  );

  useEffect(() => {
    setTimeout(() => {
      if (message) {
        sendTypingEvent();
      } else {
        sendStoppedTypingEvent();
      }
    }, 0);
  }, [message]);

  useEffect(() => {
    setOpponent(user);
  }, [user]);

  return (
    <>
      <SafeAreaView style={withColors.page}>
        <BlurView blurType="regular" style={withColors.header}>
          <Pressable style={withColors.headerBack} onPress={() => navigation.goBack()}>
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
        </BlurView>
        <Animated.FlatList
          ItemSeparatorComponent={() => <View style={withColors.separator} />}
          data={msgs}
          contentContainerStyle={withColors.contentStyle}
          inverted
          showsVerticalScrollIndicator={false}
          style={animatedStyle}
          keyExtractor={(_, index) => index.toString()}
          // @ts-ignore
          renderItem={({ item, index }) => <MessageItem index={index} key={index} item={item} />}
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
        {/* <ChatSheet /> */}
      </SafeAreaView>
    </>
  );
};

export default UserChatScreen;

// if (messages.length > 0 && messages[0]?.user.id === data.user.id) {
//   messages[0].messages.push({ message: data.message, attachment: data.attachment });
//   setTimeout(() => {
//     setMessages(messages);
//   }, 10);
// } else {
//   setMessages((msgs) => [
//     { ...data, messages: [{ message: data.message, attachment: data.attachment }] },
//     ...msgs,
//   ]);
// }
