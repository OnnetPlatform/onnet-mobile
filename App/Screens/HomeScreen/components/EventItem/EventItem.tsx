import { Text } from '@Atoms';
import { Event } from '@Khayat/Graphql/Events/types';
import { Button } from '@Molecules';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import moment, { Moment } from 'moment';
import React, { useEffect } from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import styles, { pastBackground, withColors } from './EventItem.styles';

const pastBackgroundImage = require('../../../../../assets/images/striped.png');

export const EventItem: React.FC<{ item: Event }> = ({ item }) => {
  const navigation = useNavigation();
  const colors = useColors();
  const style = withColors(colors);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const endDate = new Date(item.date);
  endDate.setMinutes(endDate.getMinutes() + item.duration);
  const isPast = isItBeforeToday(moment(endDate));
  const isStarted =
    moment(endDate).diff(moment(), 'minutes') >= 0 &&
    moment(endDate).diff(moment(), 'minutes') <= item.duration;
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

  useEffect(() => {
    opacity.value = 1;
    scale.value = 1;
    if (isStarted) {
      opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1);
      scale.value = withRepeat(withTiming(0, { duration: 500 }), -1);
    }
  }, [isStarted, item]);

  return (
    <View style={[style.itemWrapper, pastBackground(isPast, colors)]}>
      <Animated.View style={[styles.circleIndicator, animatedStyle]} />
      {isPast ? (
        <Image source={pastBackgroundImage} style={style.pastBackground} />
      ) : null}
      <Pressable
        style={[styles.itemWrapper, style.borderLeft]}
        // @ts-ignore
        onPress={() => navigation.navigate('EventScreen', { event: item })}>
        <View style={styles.row}>
          <View>
            <Text fontSize={12} style={styles.time} weight={'semibold'}>
              {moment(item.date).format('hh:mm A')}
              {' - '}
              {moment(endDate).format('hh:mm A')}
            </Text>
            <Text fontSize={16} weight="bold">
              {item.title}
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
    </View>
  );
};

export default React.memo(
  EventItem,
  (prev, next) => prev.item.id.toString() === next.item.id.toString()
);
