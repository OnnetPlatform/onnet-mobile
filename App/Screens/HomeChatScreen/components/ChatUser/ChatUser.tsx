// @ts-nocheck
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { UserChat } from '../../../../../types';
import { Text } from '../../../../Components/atoms';
import Avatar from '../../../../Components/atoms/Avatar/Avatar';
import styles from './ChatUser.styles';

export const ChatUser: React.FC<UserChat> = ({
  name,
  avatar,
  isActive = false,
  unreadCount,
  id,
}) => {
  const navigation = useNavigation();

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
        <Text fontSize={16}>{name}</Text>
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
