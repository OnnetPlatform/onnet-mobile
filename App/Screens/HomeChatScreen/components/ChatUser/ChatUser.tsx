// @ts-nocheck
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { UserChat } from '../../../../../types';
import { Text } from '../../../../Components/atoms';
import Avatar from '../../../../Components/atoms/Avatar/Avatar';
import styles from './ChatUser.styles';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';

export const ChatUser: React.FC<UserChat> = ({
  name,
  avatar,
  isActive = false,
  unreadCount,
  id,
}) => {
  const navigation = useNavigation();
  const { getUser, updateUser } = useRealmUsers();
  const localUser = getUser({ id });
  return (
    <Pressable
      onPress={() => {
        updateUser(localUser, 'unreadCount', 0);
        navigation.navigate('UserChatScreen', { user: localUser });
      }}>
      <View style={[styles.row]}>
        <Avatar {...{ avatar, isActive }} />
        <View>
          <Text fontSize={16}>{name}</Text>
          {localUser?.status ? (
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
