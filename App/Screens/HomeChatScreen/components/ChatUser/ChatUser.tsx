import { Separator, Text } from '@Atoms';
import Avatar from '@Atoms/Avatar/Avatar';
import { UserChat } from '@Khayat/Database/Models/types';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import styles from './ChatUser.styles';

export const ChatUser: React.FC<UserChat> = ({
  name,
  avatar,
  isActive = false,
  unreadCount,
  user_id,
}) => {
  const navigation = useNavigation();
  const { getUser } = useRealmUsers();
  const localUser = getUser({ user_id });
  const colors = useColors();
  const { id } = useSelector(AuthSelector);
  return (
    <Pressable
      onPress={() => {
        // @ts-ignore
        navigation.navigate('UserChatScreen', { user: localUser });
      }}>
      <View style={[styles.row]}>
        <Avatar {...{ avatar, isActive }} />
        <Separator horizontal />
        <View>
          <Text fontSize={16}>
            {name.trim()}
            {id === user_id ? (
              <Text style={styles.indicator} fontSize={12} color={colors.text}>
                {' You'}
              </Text>
            ) : null}
          </Text>
          {localUser?.status ? (
            <Animated.View
              entering={FadeInLeft.duration(500)}
              exiting={FadeOutLeft.duration(500)}>
              <Text fontSize={12}>{localUser?.status}</Text>
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
