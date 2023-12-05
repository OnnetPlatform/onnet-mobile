import { Icon, Separator, Text } from '@Atoms';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import { humanizeDate } from '@Utils/dateFormatter';
import moment from 'moment';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';

import withColors from './CreateEventModal.styles';

export const CreateEvetModal: React.FC = () => {
  const colors = useColors();
  const styles = withColors(colors);
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={[styles.titleIputWrapper]}>
          <Icon name={'edit-outline'} />
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={colors.text}
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
          <View style={styles.section}>
            <View style={styles.flex}>
              <Text fontSize={16} weight="semibold">
                Date{' '}
              </Text>
              <Text fontSize={16}>{moment().format('DD, ddd MMMM')}</Text>
              <Text fontSize={14} weight="light">
                {humanizeDate(new Date())}
              </Text>
            </View>
            <View style={styles.rightSection}>
              <Text fontSize={16} weight="semibold">
                Time (GMT+{new Date().getTimezoneOffset() / -60})
              </Text>
              <View style={styles.hoursRow}>
                <Text fontSize={16}>{moment().format('hh:mm A')}</Text>
                <Icon name={'arrow-forward-outline'} style={styles.icon} />
                <Text fontSize={16}>{moment().format('hh:mm A')}</Text>
              </View>
              <Text fontSize={14} weight="light">
                Duration: 1 hour
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateEvetModal;
