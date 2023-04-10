// @ts-nocheck
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { UserChat } from '../../../../../types';
import { Text } from '../../../../Components/atoms';
import Avatar from '../../../../Components/atoms/Avatar/Avatar';
import styles from './ChatUser.styles';
import useChatEvents from '../../../../Hooks/useChatEvents';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';

export const ChatUser: React.FC<UserChat> = ({
  name,
  avatar,
  isActive = false,
  unreadCount,
  id,
}) => {
  const navigation = useNavigation();
  const [typing, setTyping] = useState<boolean>(false);
  useChatEvents(
    {
      onUserTyping: (userId) => {
        if (userId.id === id) {
          setTyping(true);
        }
      },
      onUserStoppedTyping: (userId) => {
        console.log(id, userId.id);
        if (userId.id === id) {
          setTyping(false);
        }
      },
    },
    []
  );
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('UserChatScreen', {
          user: {
            name,
            avatar,
            isActive,
            unreadCount,
            id,
          },
        });
      }}>
      <View style={[styles.row]}>
        <Avatar {...{ avatar, isActive }} />
        <View>
          <Text fontSize={16}>{name}</Text>
          {typing ? (
            <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)}>
              <Text fontSize={12}>typing...</Text>
            </Animated.View>
          ) : null}
        </View>
        {unreadCount > 0 ? (
          <View style={styles.badge}>
            <Text fontSize={10} color="white" weight="bold">
              {unreadCount}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

export default ChatUser;
