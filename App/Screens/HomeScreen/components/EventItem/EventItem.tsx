import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { Card, Text } from '../../../../Components/atoms';
import styles from './EventItem.styles';
import { JoinedUsers } from './types';

export const EventItem: React.FC<any> = React.memo(
  ({ event }) => {
    const navigation = useNavigation();
    return (
      // @ts-ignore
      <Pressable onPress={() => navigation.navigate('ConferenceScreen')}>
        <Card>
          <Text fontSize={16} style={styles.time} weight={'semibold'}>
            Daily, {moment(event.date).format('hh:mm A')}
          </Text>
          <Text fontSize={22} weight="bold">
            {event.title}
          </Text>
          <View style={styles.joinedUsersContainer}>
            <FlatList
              data={JoinedUsers}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const left = { left: -index * 22 };
                return (
                  <View key={index} style={[styles.joinedUserWrapper, left]}>
                    <Image source={{ uri: item.avatar }} style={styles.joinedUserAvatar} />
                  </View>
                );
              }}
            />
          </View>
        </Card>
      </Pressable>
    );
  },
  (prev, next) => prev.title === next.title
);

export default EventItem;
