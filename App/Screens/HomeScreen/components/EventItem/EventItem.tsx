import { useNavigation } from '@react-navigation/native';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { Separator, Text } from '../../../../Components/atoms';
import { Collapsible } from '../../../../Components/atoms/Collapsible/Collapsible';
import { Button } from '../../../../Components/molecules';
import { useColors } from '../../../../Theme';
import styles, { pastBackground, withColors } from './EventItem.styles';

const pastBackgroundImage = require('../../../../../assets/images/striped.png');

export const EventItem: React.FC<any> = ({ event }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigation = useNavigation();
  const colors = useColors();
  const style = withColors(colors);
  const collapsibleValue = useSharedValue(0);
  const isStarted =
    event.date.getMonth() === new Date().getMonth() &&
    event.date.getDate() === new Date().getDate() &&
    event.date.getHours() === new Date().getHours();

  function isItBeforeToday(MomentDate: Moment) {
    return MomentDate.diff(moment(0, 'minutes')) < 0;
  }
  const isPast = isItBeforeToday(moment(event.date));

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
            data={event.users?.slice(0, 5)}
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
          {/* @ts-ignore*/}
          <Button onPress={() => navigation.navigate('ConferenceScreen')}>
            <Text weight="bold">Join</Text>
          </Button>
        </View>
      </Pressable>

      <Collapsible animatedValue={collapsibleValue} expanded={expanded}>
        <View style={style.joinedUsersContainer}>
          <Text weight="bold">Duration: {event.duration} mins</Text>
          <Separator />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas
            risus vitae porttitor vestibulum. Proin lobortis pulvinar nibh, quis
            dictum metus. Nulla in lectus imperdiet, scelerisque ex et, laoreet
            augue. Duis varius sagittis posuere. Fusce volutpat malesuada erat
            ac lacinia. Donec facilisis dui molestie neque porttitor commodo.
            Aenean id risus id nulla volutpat viverra. Cras interdum fermentum
            accumsan.
          </Text>
          <View style={styles.joinedUsersContainer}>
            <FlatList
              data={event.users?.slice(0, 5)}
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
  (prev, next) => prev.event.date.toString() === next.event.date.toString()
);
