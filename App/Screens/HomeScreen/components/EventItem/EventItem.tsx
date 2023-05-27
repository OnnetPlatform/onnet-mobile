import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Text } from '../../../../Components/atoms';
import { Collapsible } from '../../../../Components/atoms/Collapsible/Collapsible';
import { useColors } from '../../../../Theme';
import styles, { withColors } from './EventItem.styles';
import { useFakerData } from '../EventsList/Data';

export const EventItem: React.FC<any> = React.memo(
  ({ event }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const navigation = useNavigation();
    const colors = useColors();
    const style = withColors(colors);
    const collapsibleValue = useSharedValue(0);
    const { chatUsers } = useFakerData();
    const isStarted =
      event.date.getDate() === new Date().getDate() &&
      event.date.getHours() === new Date().getHours();
    const blur = useSharedValue<number>(0);
    useEffect(() => {
      blur.value = withTiming(expanded ? 100 : 0, { duration: 1000 });
    }, [expanded]);

    return (
      <View style={style.itemWrapper}>
        <Pressable onPress={() => setExpanded(!expanded)}>
          <View style={styles.row}>
            <View style={style.dash} />
            <Animated.Text style={styles.title}>
              <Text fontSize={16} weight="bold">
                {event.title}
              </Text>
              <Text style={styles.dot} fontSize={12} weight="bold">
                {' • '}
              </Text>
              <Text fontSize={12} style={styles.time} weight={'semibold'}>
                {moment(event.date).format('hh:mm A')}
              </Text>
            </Animated.Text>
          </View>
        </Pressable>

        {isStarted ? (
          <View style={styles.joinButton}>
            <Pressable
              // @ts-ignore
              onPress={() => navigation.navigate('ConferenceScreen')}
              style={[style.joinButton, styles.joinButtonContent]}>
              <Text weight="bold">Join</Text>
            </Pressable>
          </View>
        ) : null}

        <Collapsible animatedValue={collapsibleValue} expanded={expanded}>
          <View style={{ paddingHorizontal: 38 }}>
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
                data={chatUsers.slice(0, 5)}
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
  },
  (prev, next) => prev.title === next.title
);

export default EventItem;
