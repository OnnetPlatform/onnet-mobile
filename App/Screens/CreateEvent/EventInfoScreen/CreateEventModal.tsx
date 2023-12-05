import { Icon, Separator, Text } from '@Atoms';
import { useEventContext } from '@Context/EventContext/EventContext';
import { EventCreators } from '@Khayat/Redux';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import { humanizeDate } from '@Utils/dateFormatter';
import moment from 'moment';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Header from '../Components/Header/Header';
import withColors from './CreateEventModal.styles';
import { initial_event_data } from './types';

export const CreateEvetModal: React.FC = () => {
  const colors = useColors();
  const styles = withColors(colors);
  const navigation = useNavigation();
  const { setEventData, event } = useEventContext();
  const dispatch = useDispatch();
  const goBack = () => navigation.goBack();
  const dispatchEvent = () => {
    dispatch(EventCreators.createEvent(event));
    goBack();
  };
  const onSavePressed = () => {
    console.log(event);
    if (!event.title) {
      Alert.alert('Error', 'Title is required');
    } else {
      dispatchEvent();
    }
  };
  const onDismissPressed = () => {
    Alert.alert('Are you sure?', 'All your data will be dismissed', [
      {
        text: 'Go back',
        style: 'destructive',
        onPress: goBack,
      },
      {
        text: 'Save',
        style: 'default',
        onPress: dispatchEvent,
      },
    ]);
  };

  useEffect(() => {
    setEventData(initial_event_data);
    return () => {
      setEventData(initial_event_data);
    };
  }, []);

  if (!event) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.screen}>
      <Header
        onSavePressed={onSavePressed}
        onDismissPressed={onDismissPressed}
      />
      <View style={styles.body}>
        <View style={[styles.titleIputWrapper]}>
          <Icon name={'edit-outline'} />
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={colors.text}
            value={event.title}
            onChangeText={(text) => setEventData({ ...event, title: text })}
          />
        </View>

        <Separator size={'md'} />
        <Pressable
          style={styles.item}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('EventDescription');
          }}>
          <View style={styles.row}>
            <Icon name={'edit-outline'} />
            <Separator size="md" horizontal />
            <Text fontSize={16}>Description</Text>
          </View>

          <Icon name={'chevron-right-outline'} />
        </Pressable>
        <Separator size={'md'} />

        <Pressable
          style={styles.item}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('EventDescription');
          }}>
          <View style={styles.row}>
            <Icon name={'people-outline'} />
            <Separator size="md" horizontal />
            <Text fontSize={16}>People</Text>
          </View>
          <Icon name={'chevron-right-outline'} />
        </Pressable>
        <Separator size={'md'} />

        <View style={styles.itemWrapper}>
          <View style={[styles.row, styles.item]}>
            <View style={styles.row}>
              <Icon name={'calendar-outline'} />
              <Separator horizontal size={'md'} />
              <Text fontSize={16}>All day</Text>
            </View>
          </View>
          <Pressable
            style={styles.section}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('EventTime');
            }}>
            <View style={styles.flex}>
              <Text fontSize={16} weight="semibold">
                Date{' '}
              </Text>
              <Text fontSize={16}>
                {moment(event.date).format('DD, ddd MMMM')}
              </Text>
              <Text fontSize={14} weight="light">
                {humanizeDate(new Date(event.date))}
              </Text>
            </View>
            <View style={styles.rightSection}>
              <Text fontSize={16} weight="semibold">
                Time (GMT+{new Date().getTimezoneOffset() / -60})
              </Text>
              <View style={styles.hoursRow}>
                <Text fontSize={16}>
                  {moment(event.date).format('hh:mm A')}
                </Text>
                <Icon name={'arrow-forward-outline'} style={styles.icon} />
                <Text fontSize={16}>
                  {moment(event.date).format('hh:mm A')}
                </Text>
              </View>
              <Text fontSize={14} weight="light">
                Duration: {event.duration}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CreateEvetModal;
