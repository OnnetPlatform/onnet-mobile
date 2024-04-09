import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import PageView from '@HOCs/PageView';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import { useColors } from '@Theme/index';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { EventScreenProps } from './types';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useStyles } from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { InvitationResponse, useEventUsers } from '@Hooks/useEventUsers';
import { useEvent } from '@Hooks/useEvent';
import { useBottomSheet } from '@Context/BottomSheet';
import { RSVP } from './components/RSVP';
import { useStyles as useAppStyles } from '@Theme/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventActionSheet from './components/EventActionSheet';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import User from '@Molecules/User';
import { getStatus } from './utils';

export const EventScreen: React.FC<EventScreenProps> = ({ route }) => {
  const { event } = route.params;
  const colors = useColors();
  const { backgroundSecondary } = useAppStyles();
  const insets = useSafeAreaInsets();
  const styles = useStyles(colors, insets);
  const navigation = useNavigation<EventScreenProps['navigation']>();
  const { users, fetchUsers } = useEventUsers(event.id);
  const { event: fetchedEvent, fetchEvent, loading } = useEvent(event.id);
  const { showBottomSheet } = useBottomSheet();
  const { id } = useSelector(AuthSelector);
  const isFocused = useIsFocused();
  const [fromNow, setFromNow] = useState<string>('');
  useEffect(() => {
    if (isFocused) {
      fetchEvent();
    }
  }, [isFocused]);

  const onRSVPPressed = useCallback(() => {
    if (fetchedEvent)
      showBottomSheet({
        title: 'Availability',
        subtitle: 'Confirm your availability, all guests will be notified',
        body() {
          return <RSVP event_id={fetchedEvent?.id} onUpdate={fetchUsers} />;
        },
      });
  }, [fetchedEvent, colors]);

  const is_organizer = useMemo(
    () => id === fetchedEvent?.organizer.user,
    [id, fetchedEvent]
  );
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (fetchedEvent) {
      setFromNow(moment(moment(fetchedEvent.date)).fromNow());
      interval = setInterval(() => {
        setFromNow(moment(moment(fetchedEvent.date)).fromNow());
      }, 1000);
    }

    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
  }, [fetchedEvent]);

  const renderInvitations: ListRenderItem<InvitationResponse> = useCallback(
    ({ item }) => {
      if (!fetchedEvent) return <View />;
      const is_organizer = item.user?.id === fetchedEvent.organizer.id;
      const status = getStatus(item.status);
      console.log(item);
      return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <User
            subtitle={
              <Text color={status?.color}>
                {is_organizer ? 'Host' : ''} • {status?.title}
              </Text>
            }
            {...item.user}
            key={item?.user?.id}
          />
        </View>
      );
    },
    [users, is_organizer]
  );
  return (
    <PageView
      edges={[]}
      title={'Event'}
      loading={loading}
      onRightIconPressed={() => {
        if (fetchedEvent)
          showBottomSheet({
            body() {
              return <EventActionSheet event={fetchedEvent} />;
            },
          });
      }}
      rightIcon={is_organizer ? 'more-horizontal-outline' : undefined}>
      {fetchedEvent ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}>
          <View>
            <Text fontSize={24} weight="bold">
              {fetchedEvent?.title}
            </Text>
            <Separator size={'md'} />
            <View style={styles.date_container}>
              <Icon name={'calendar-outline'} style={styles.calendar_icon} />
              <Separator horizontal />
              <Text style={{ flex: 1 }} weight="semibold" fontSize={16}>
                {moment(fetchedEvent?.date).format('Do, MMMM YYYY hh:mm A')}
                <Text weight="light" fontSize={16}>
                  {' '}
                  ({fromNow})
                </Text>
              </Text>
            </View>
            <Separator size={'md'} />
            <Pressable
              onPress={() =>
                navigation.navigate('ConferenceScreen', { event: fetchedEvent })
              }
              style={styles.start_button}>
              <Text weight="bold">Start Meeting</Text>
            </Pressable>
          </View>

          <Separator size={'md'} />
          <Separator size={'md'} />
          <View style={styles.date_container}>
            <Icon name={'bell-outline'} style={styles.calendar_icon} />
            <Separator horizontal />
            <Text fontSize={18} weight="bold">
              Reminder
            </Text>
          </View>

          <Separator />
          <View style={styles.button_container}>
            <Pressable style={[backgroundSecondary, styles.mins_button]}>
              <Text weight="bold">30</Text>
            </Pressable>
            <Separator horizontal />
            <SolidButton onPress={() => fetchEvent()}>
              <View style={styles.reminder_button}>
                <Text weight="bold">Set Reminder</Text>
              </View>
            </SolidButton>
          </View>
          <Separator />
          <Text fontSize={14} weight="light">
            Reminder set 30 minutes before the meeting
          </Text>
          <Separator size={'md'} />
          <Separator size={'md'} />
          <View style={styles.summary_container}>
            <Pressable
              onPress={() => {
                navigation.navigate('ProfileScreen', {
                  id: fetchedEvent.organizer.user,
                });
              }}
              style={styles.organizer}>
              <User {...fetchedEvent.organizer} subtitle="Organizer" />
            </Pressable>
            {fetchedEvent.description && (
              <>
                <Separator size={'md'} />
                <Text>{fetchedEvent.description}</Text>
              </>
            )}
          </View>
          <FlashList
            scrollEnabled={false}
            data={users}
            extraData={users}
            ListHeaderComponent={
              <Text fontSize={18} style={{ marginBottom: 16 }} weight="bold">
                ({users.length}) Guests
              </Text>
            }
            ItemSeparatorComponent={() => <Separator size={'md'} />}
            contentContainerStyle={styles.list_content}
            renderItem={renderInvitations}
          />
        </ScrollView>
      ) : null}
      <SolidButton style={styles.cta} onPress={onRSVPPressed}>
        <Text weight="bold">RSVP</Text>
      </SolidButton>
    </PageView>
  );
};
export default EventScreen;
