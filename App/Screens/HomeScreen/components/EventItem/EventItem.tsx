import { useNavigation } from '@react-navigation/native';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Text } from '../../../../Components/atoms';
import { Collapsible } from '../../../../Components/atoms/Collapsible/Collapsible';
import { useColors } from '../../../../Theme';
import styles, { withColors } from './EventItem.styles';
import { Button } from '../../../../Components/molecules';

export const EventItem: React.FC<any> = ({ event }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigation = useNavigation();
  const colors = useColors();
  const style = withColors(colors);
  const collapsibleValue = useSharedValue(0);
  const index = Math.random();
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
    <View
      style={[
        style.itemWrapper,
        { backgroundColor: isPast ? 'transparent' : colors.secondaryBackground },
      ]}>
      <View
        style={{
          height: 8,
          width: 8,
          backgroundColor: 'white',
          position: 'absolute',
          left: 9,
          borderRadius: 8,
          zIndex: 100,
        }}
      />
      {isPast ? (
        <Image
          source={require('../../../../../assets/images/striped.png')}
          style={{
            width: '100%',
            height: 200,
            position: 'absolute',
            tintColor: colors.text,
            opacity: 0.2,
          }}
        />
      ) : null}
      <Pressable
        disabled={isPast}
        style={[
          styles.itemWrapper,
          {
            borderLeftWidth: 2,
            borderLeftColor: colors.text,
          },
        ]}
        onPress={() => setExpanded(!expanded)}>
        <Text fontSize={12} style={styles.time} weight={'semibold'}>
          {moment(event.date).format('hh:mm A')} - {moment(event.date).format('hh:mm A')}
        </Text>
        <Text fontSize={16} weight="bold">
          {event.title}
        </Text>
        <View style={styles.row}>
          <FlatList
            data={event.users?.slice(0, 5)}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ marginTop: 8 }}
            renderItem={({ item, index }) => {
              return (
                <View key={item.id} style={[styles.joinedUserWrapper, { left: -8 * index }]}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={[
                      styles.joinedUserAvatar,
                      { marginRight: 0, borderWidth: 2, borderColor: colors.background },
                    ]}
                  />
                </View>
              );
            }}
          />
          {isStarted ? (
            // @ts-ignore
            <Button onPress={() => navigation.navigate('ConferenceScreen')}>
              <Text weight="bold">Join</Text>
            </Button>
          ) : null}
        </View>
      </Pressable>

      <Collapsible animatedValue={collapsibleValue} expanded={expanded}>
        <View
          style={{
            paddingHorizontal: 38,
            backgroundColor: colors.background,
            paddingVertical: 16,
            borderLeftColor: colors.cyan,
            borderLeftWidth: 2,
          }}>
          <Text weight="bold">Duration: {event.duration} mins</Text>
          <Text style={{ marginVertical: 8 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas risus vitae
            porttitor vestibulum. Proin lobortis pulvinar nibh, quis dictum metus. Nulla in lectus
            imperdiet, scelerisque ex et, laoreet augue. Duis varius sagittis posuere. Fusce
            volutpat malesuada erat ac lacinia. Donec facilisis dui molestie neque porttitor
            commodo. Aenean id risus id nulla volutpat viverra. Cras interdum fermentum accumsan.
          </Text>
          <View style={styles.joinedUsersContainer}>
            <FlatList
              data={event.users?.slice(0, 5)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View key={item.id} style={[styles.joinedUserWrapper]}>
                    <Image source={{ uri: item.avatar }} style={styles.joinedUserAvatar} />
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
