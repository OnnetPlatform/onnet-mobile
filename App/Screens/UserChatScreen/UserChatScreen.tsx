import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Message, UploadedImage } from '../../../types';
import { UserChatMessage } from './types';
import { Icon, Text } from '../../Components/atoms';
import Avatar from '../../Components/atoms/Avatar/Avatar';
import { useSocketContext } from '../../Context/SocketContext/SocketContext';
import { useChat } from '../../Hooks/useChat';
import useChatEvents from '../../Hooks/useChatEvents';
import { useColors } from '../../Theme';
import { MessageInput, MessageItem } from './components';
import styles from './UserChatScreen.styles';

export const UserChatScreen: React.FC = ({ route }: any) => {
  const { user } = route.params;
  const { sendDirectMessage, sendStoppedTypingEvent, sendTypingEvent } = useChat(user);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<UserChatMessage[]>([]);
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { currentUser, setOpponent } = useSocketContext();
  const withColors = styles(colors, insets);
  const sheetInputHeight = useSharedValue<number>(0);
  const [attachedImage, setAttachedImage] = useState<UploadedImage | undefined>();

  const onDirectMessage = (data: Message) => {
    setMessages((msgs) => [
      { ...data, messages: [{ message: data.message, attachment: data.attachment }] },
      ...msgs,
    ]);
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
  };

  const onSend = () =>
    sendDirectMessage(
      {
        message,
        attachment: { gallery: attachedImage ? [attachedImage] : [] },
      },
      () => {
        onDirectMessage({
          user: currentUser,
          message,
          attachment: { gallery: attachedImage ? [attachedImage] : [] },
        });
        setMessage('');
        setAttachedImage(undefined);
      }
    );

  useChatEvents({ onDirectMessage }, []);

  const animatedStyle = useAnimatedStyle(
    () => ({
      paddingVertical: withTiming(sheetInputHeight.value + 70, {
        duration: 100,
        easing: Easing.linear,
      }),
    }),
    []
  );

  useEffect(() => {
    if (message) sendTypingEvent();
    else sendStoppedTypingEvent();
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
          <View>
            <Avatar avatar={user.avatar} isActive={user.isActive} />
          </View>
          <Text weight="bold" fontSize={16}>
            {user.name}
          </Text>
        </BlurView>
        <Animated.FlatList
          ItemSeparatorComponent={() => <View style={withColors.separator} />}
          data={messages}
          contentContainerStyle={withColors.contentStyle}
          inverted
          showsVerticalScrollIndicator={false}
          style={animatedStyle}
          renderItem={({ item, index }) => <MessageItem index={index} key={index} item={item} />}
        />
        <MessageInput
          sheetInputHeight={sheetInputHeight}
          onSend={onSend}
          value={message}
          onChangeText={setMessage}
          onAttachedImage={setAttachedImage}
          attachedImage={attachedImage}
        />
      </SafeAreaView>
    </>
  );
};

export default UserChatScreen;
