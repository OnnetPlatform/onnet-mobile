import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Card, Text } from '../../../../Components/atoms';
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
    const collapsibleValue = useSharedValue(0);
    const isStarted =
      event.date.getDate() === new Date().getDate() &&
      event.date.getHours() === new Date().getHours();

    return (
      <Card>
        <Pressable onPress={() => setExpanded(!expanded)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={style.date}>
              <Text color={colors.text} weight="bold" fontSize={12}>
                {moment(event.date).format('DD')}
              </Text>
              <Text fontSize={12} color={colors.text} weight="light">
                {moment(event.date).format('ddd')}
              </Text>
            </View>
            <Animated.Text
              style={{
                flex: 1,
                marginLeft: 8,
              }}>
              <Text fontSize={16} weight="bold">
                {event.title}
              </Text>
              <Text style={{ lineHeight: 8, marginHorizontal: 4 }} fontSize={12} weight="bold">
                {' • '}
              </Text>
              <Text fontSize={12} style={styles.time} weight={'semibold'}>
                {moment(event.date).format('hh:mm A')}
              </Text>
            </Animated.Text>
          </View>
        </Pressable>

        {isStarted ? (
          <View style={{ alignItems: 'flex-end', marginTop: 11 }}>
            <Pressable
              // @ts-ignore
              onPress={() => navigation.navigate('ConferenceScreen')}
              style={[style.joinButton, { marginTop: 0, marginVertical: 0 }]}>
              <Text weight="bold">Join</Text>
            </Pressable>
          </View>
        ) : null}

        <Collapsible animatedValue={collapsibleValue} expanded={expanded}>
          <View style={styles.joinedUsersContainer}>
            <FlatList
              data={JoinedUsers}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const left = { left: -index * 12 };
                return (
                  <View key={index} style={[styles.joinedUserWrapper, left]}>
                    <Image source={{ uri: item.avatar }} style={styles.joinedUserAvatar} />
                  </View>
                );
              }}
            />
          </View>
        </Collapsible>
      </Card>
    );
  },
  (prev, next) => prev.title === next.title
);

export default EventItem;
