import { Separator, Text } from '@Atoms';
import { Collapsible } from '@Atoms/Collapsible/Collapsible';
import { Event } from '@Khayat/Graphql/Events/types';
import { Button } from '@Molecules';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import styles, { pastBackground, withColors } from './EventItem.styles';

const pastBackgroundImage = require('../../../../../assets/images/striped.png');

export const EventItem: React.FC<{ event: Event }> = ({ event }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigation = useNavigation();
  const colors = useColors();
  const style = withColors(colors);
  const collapsibleValue = useSharedValue(0);
  const isStarted =
    new Date(event.date).getMonth() === new Date().getMonth() &&
    new Date(event.date).getDate() === new Date().getDate() &&
    new Date(event.date).getHours() === new Date().getHours();

  function isItBeforeToday(MomentDate: Moment) {
    return MomentDate.diff(moment(0, 'minutes')) < 0;
  }
  const isPast = isItBeforeToday(moment(new Date(event.date)));

  const blur = useSharedValue<number>(0);

  useEffect(() => {
    blur.value = withTiming(expanded ? 100 : 0, { duration: 1000 });
  }, [expanded]);

  return (
    <View style={[style.itemWrapper, pastBackground(isPast, colors)]}>
      <View style={styles.circleIndicator} />
      {isPast ? (
        <Image source={pastBackgroundImage} style={style.pastBackground} />
      ) : null}
      <Pressable
        disabled={isPast}
        style={[styles.itemWrapper, style.borderLeft]}
        onPress={() => setExpanded(!expanded)}>
        <Text fontSize={12} style={styles.time} weight={'semibold'}>
          {moment(event.date).format('hh:mm A')}
          {' - '}
          {moment(event.date).format('hh:mm A')}
        </Text>
        <Text fontSize={16} weight="bold">
          {event.title}
        </Text>
        <View style={styles.row}>
          <FlatList
            data={[]}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.mt8}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={item.id}
                  style={[styles.joinedUserWrapper, { left: -8 * index }]}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={[styles.joinedUserAvatar, style.avatar]}
                  />
                </View>
              );
            }}
          />
          {!isStarted ? (
            // @ts-ignore
            <Button onPress={() => navigation.navigate('ConferenceScreen')}>
              <Text weight="bold">Join</Text>
            </Button>
          ) : null}
        </View>
      </Pressable>

      <Collapsible animatedValue={collapsibleValue} expanded={expanded}>
        <View style={style.joinedUsersContainer}>
          <Text weight="bold">Duration: {event.duration} mins</Text>
          <Separator />
          <Text>{event.description}</Text>
          <View style={styles.joinedUsersContainer}>
            <FlatList
              data={[]}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View key={item.id} style={[styles.joinedUserWrapper]}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.joinedUserAvatar}
                    />
                    <Text>{item.name}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </Collapsible>
    </View>
  );
};

export default React.memo(
  EventItem,
  (prev, next) => prev.event.id.toString() === next.event.id.toString()
);
