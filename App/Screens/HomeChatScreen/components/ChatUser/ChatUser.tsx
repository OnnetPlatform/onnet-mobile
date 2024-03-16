import { Separator, Text } from '@Atoms';
import Avatar from '@Atoms/Avatar/Avatar';
import { ProfileObject } from '@Khayat/Database/Models/types';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import styles from './ChatUser.styles';
import { useRealmProfiles } from '../../../../Database/Hooks/useRealmProfiles';

export const ChatUser: React.FC<{ item: ProfileObject }> = ({ item }) => {
  const { user, first_name, last_name, avatar, active } = item;
  console.log(item);
  const navigation = useNavigation();
  const { getUser } = useRealmProfiles();
  const localUser = getUser({ user });
  const colors = useColors();
  const { id } = useSelector(AuthSelector);

  return (
    <Pressable
      style={{ marginHorizontal: 22 }}
      onPress={() => {
        // @ts-ignore
        navigation.navigate('UserChatScreen', { user: localUser });
      }}>
      <View style={[styles.row]}>
        <Avatar {...{ avatar, isActive: active === true }} />
        <Separator horizontal />
        <View>
          <Text weight="bold" fontSize={16}>
            {first_name} {last_name}
            {id === user ? (
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
        {/* {unreadCount > 0 ? (
          <View style={styles.badge}>
            <Text fontSize={10} color="white" weight="bold">
              {unreadCount}
            </Text>
          </View>
        ) : null} */}
      </View>
    </Pressable>
  );
};

export default ChatUser;
