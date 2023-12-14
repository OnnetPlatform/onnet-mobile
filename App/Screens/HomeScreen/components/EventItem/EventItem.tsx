import { Separator, Text } from '@Atoms';
import { Collapsible } from '@Atoms/Collapsible/Collapsible';
import { Event } from '@Khayat/Graphql/Events/types';
import { Button } from '@Molecules';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import styles, { pastBackground, withColors } from './EventItem.styles';

const pastBackgroundImage = require('../../../../../assets/images/striped.png');

export const EventItem: React.FC<{ event: Event }> = ({ event }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigation = useNavigation();
  const colors = useColors();
  const style = withColors(colors);
  const collapsibleValue = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const endDate = new Date(event.date);
  endDate.setMinutes(endDate.getMinutes() + event.duration);

  const isPast = isItBeforeToday(moment(endDate));
  const isStarted =
    moment(endDate).diff(moment(), 'minutes') >= 0 &&
    moment(endDate).diff(moment(), 'minutes') <= event.duration;
  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: isStarted ? colors.pink : colors.background,
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }),
    [isStarted]
  );
  function isItBeforeToday(MomentDate: Moment) {
    return MomentDate.diff(moment(0, 'minutes')) < 0;
  }

  const blur = useSharedValue<number>(0);

  useEffect(() => {
    blur.value = withTiming(expanded ? 100 : 0, { duration: 1000 });
  }, [expanded]);

  useEffect(() => {
    opacity.value = 1;
    scale.value = 1;
    if (isStarted) {
      opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1);
      scale.value = withRepeat(withTiming(0, { duration: 500 }), -1);
    }
  }, [isStarted, event]);

  return (
    <View style={[style.itemWrapper, pastBackground(isPast, colors)]}>
      <Animated.View style={[styles.circleIndicator, animatedStyle]} />
      {isPast ? (
        <Image source={pastBackgroundImage} style={style.pastBackground} />
      ) : null}
      <Pressable
        style={[styles.itemWrapper, style.borderLeft]}
        onPress={() => setExpanded(!expanded)}>
        <View style={styles.row}>
          <View>
            <Text fontSize={12} style={styles.time} weight={'semibold'}>
              {moment(event.date).format('hh:mm A')}
              {' - '}
              {moment(endDate).format('hh:mm A')}
            </Text>
            <Text fontSize={16} weight="bold">
              {event.title}
            </Text>
          </View>
          {isStarted ? (
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
          <View style={styles.joinedUsersContainer} />
        </View>
      </Collapsible>
    </View>
  );
};

export default React.memo(
  EventItem,
  (prev, next) => prev.event.id.toString() === next.event.id.toString()
);
