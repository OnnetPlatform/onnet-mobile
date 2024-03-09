import Avatar from '@Atoms/Avatar';
import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import PageView from '@HOCs/PageView';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { useColors } from '@Theme/index';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { EventScreenProps } from './types';
import { UserChat } from '@Khayat/Database/Models/types';
import { FlashList } from '@shopify/flash-list';
import { faker } from '@faker-js/faker';
import { useStyles } from './styles';
import { useNavigation } from '@react-navigation/native';

export const EventScreen: React.FC<EventScreenProps> = ({ route }) => {
  const { event } = route.params;
  const colors = useColors();

  const styles = useStyles(colors);
  const navigation = useNavigation<EventScreenProps['navigation']>();

  const users: UserChat[] = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        last_name: faker.person.lastName(),
        first_name: faker.person.firstName(),
        email: faker.internet.email(),
        id: faker.database.mongodbObjectId(),
        _id: faker.database.mongodbObjectId(),
        unreadCount: 1,
        avatar: faker.image.avatar(),
        isActive: i % 2 === 0,
        status: 'TYPING',
      })),
    []
  );

  return (
    <PageView title={'Event'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoRow}>
          <View>
            <Text fontSize={18} weight="bold">
              {event.title}
            </Text>
            <Text>Cairo, Egypt</Text>
          </View>
          <View style={styles.date_container}>
            <Icon name={'calendar-outline'} style={styles.calendar_icon} />
            <Text fontSize={12}>
              {moment(event.date).format('Do, MMMM YYYY hh:mm A')}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}
          style={styles.organizer}>
          <Avatar isActive={false} avatar={event.organizer.avatar} />
          <Separator horizontal />
          <View>
            <Text fontSize={18} weight="bold">
              {event.organizer.first_name} {event.organizer.last_name}
            </Text>
            <Text fontSize={14} weight="light">
              @{event.organizer.first_name}
            </Text>
          </View>
        </Pressable>
        <View style={styles.button_container}>
          <SolidButton>
            <Text weight="bold">Set Reminder</Text>
          </SolidButton>
        </View>

        <View style={styles.summary_container}>
          <Text weight="bold">Summary</Text>
          <Separator />
          <Text>{event.description}</Text>
        </View>
        <View>
          <Separator />
          <FlashList
            scrollEnabled={false}
            data={users}
            ListHeaderComponent={
              <Text style={{ marginBottom: 16 }} weight="bold">
                Joining
              </Text>
            }
            ItemSeparatorComponent={Separator}
            contentContainerStyle={styles.list_content}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('ProfileScreen');
                }}
                style={styles.joined_user}>
                <Avatar avatar={item.avatar} isActive={item.isActive} />
                <Separator horizontal />
                <Text weight="bold">
                  {item.first_name} {item.last_name}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </PageView>
  );
};
export default EventScreen;
