import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Card, Icon, Text } from '../../../../Components/atoms';
import { Collapsible } from '../../../../Components/atoms/Collapsible/Collapsible';
import { useColors } from '../../../../Theme';
import styles, { withColors } from './EventItem.styles';
import { JoinedUsers } from './types';

export const EventItem: React.FC<any> = React.memo(
  ({ event }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const navigation = useNavigation();
    const colors = useColors();
    const style = withColors(colors);
    const isStarted =
      event.date.getDate() === new Date().getDate() &&
      event.date.getHours() === new Date().getHours();
    const sharedCollapsibleValue = useSharedValue(0);
    return (
      // @ts-ignore
      <Card>
        <Pressable onPress={() => setExpanded(!expanded)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={style.date}>
              <Text color={colors.black} weight="bold" fontSize={18}>
                {moment(event.date).format('DD')}
              </Text>
              <Text color={colors.black} weight="light">
                {moment(event.date).format('ddd')}
              </Text>
            </View>
            <Animated.Text style={{ flex: 1, marginLeft: 16 }}>
              <Text fontSize={22} weight="bold">
                {event.title}
              </Text>
            </Animated.Text>
          </View>
        </Pressable>

        <Collapsible expanded={expanded}>
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
          {isStarted ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Pressable style={style.joinButton}>
                <Text weight="bold">Join</Text>
              </Pressable>
            </View>
          ) : null}
        </Collapsible>
      </Card>
    );
  },
  (prev, next) => prev.title === next.title
);

export default EventItem;
