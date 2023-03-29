import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserMessage } from '../../../types';
import { Icon, Text } from '../../Components/atoms';
import Avatar from '../../Components/atoms/Avatar/Avatar';
import { KeyboardAvoidingView } from '../../Components/HOCs';
import { useSocketContext } from '../../Context/SocketContext/SocketContext';
import { useChat } from '../../Hooks/useChat';
import useChatEvents from '../../Hooks/useChatEvents';
import ChatEvents from '../../Services/ChatEvents/ChatEvents';
import { useColors } from '../../Theme';
import styles from './UserChatScreen.styles';

export const UserChatScreen: React.FC = ({ route }: any) => {
  const { user } = route.params;
  const { sendDirectMessage } = useChat(user);

  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const withColors = styles(colors, insets);

  const { socket, connectedUsers, currentUser } = useSocketContext();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const users = Array.from(connectedUsers, ([_, value]) => ({ ...value }));
  const onDirectMessage = (data: UserMessage) => {
    if (data.user.id === user.id) setMessages((messages) => [data, ...messages]);
  };
  useChatEvents({ onDirectMessage });

  return (
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
      <FlatList
        ItemSeparatorComponent={() => <View style={withColors.separator} />}
        data={messages}
        ListHeaderComponent={() => <Text style={withColors.typingText}>Someone is typing...</Text>}
        contentContainerStyle={withColors.contentStyle}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={withColors.row}>
            <View>
              <Avatar avatar={item.user.avatar} isActive={item.user.isActive} />
            </View>
            <View style={withColors.flex}>
              <Text fontSize={15} weight={'bold'}>
                {item.user.name}
              </Text>
              <View style={withColors.messageWrapper}>
                <Text style={withColors.flex}>{item.message}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <KeyboardAvoidingView style={withColors.messageContainer}>
        <TextInput
          onChangeText={setMessage}
          value={message}
          onSubmitEditing={() => {
            sendDirectMessage(message, () => {
              setMessages((msgs) => [{ user: currentUser, message }, ...msgs]);
              setMessage('');
            });
          }}
          style={withColors.messageInput}
          placeholder="Message"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default UserChatScreen;
