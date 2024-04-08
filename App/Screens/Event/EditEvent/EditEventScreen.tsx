import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { EditEventScreenProps } from './types';
import { useStyles as useAppStyles } from '@Theme/Colors';
import {
  Pressable,
  ScrollView,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import Text from '@Atoms/Text';
import Icon from '@Atoms/Icon';
import { useColors } from '@Theme/index';
import { useStyles } from './styles';
import moment from 'moment';
import Separator from '@Atoms/Separator';
import { Event } from '@Khayat/Graphql/Events/types';
import { useAppNavigation } from '@Hooks/useAppNavigation';
import { CalendarProvider } from '@Molecules/Calendar/CalendarContext';
import Collapsible from '@Atoms/Collapsible';
import { useEvent } from '@Hooks/useEvent';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import HeaderLoader from '@Atoms/HeaderLoader';

export const EditEventScreen: React.FC<EditEventScreenProps> = ({ route }) => {
  const { event } = route.params;
  const styles = useAppStyles();
  const colors = useColors();
  const style = useStyles();
  const { updateEvent, loading, event: fetchedEvent } = useEvent(event.id);
  const [stagedEvent, setStagedEvent] = useState<Partial<Event>>();
  const navigation = useAppNavigation();
  const [expandCalendar, setCalendar] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const onChangeText = useCallback(
    (key: keyof Event, value: string) => {
      setStagedEvent((data) => ({ ...data, [key]: value }));
    },
    [stagedEvent]
  );

  useEffect(() => {
    if (fetchedEvent) {
      setStagedEvent({
        title: fetchedEvent.title,
        description: fetchedEvent.description,
        date: fetchedEvent.date,
        id: fetchedEvent.id,
      });
    }
  }, [fetchedEvent]);

  const onUpdatedPressed = useCallback(() => {
    if (stagedEvent) updateEvent(stagedEvent);
  }, [stagedEvent]);

  if (!fetchedEvent || !stagedEvent) return null;

  return (
    <SafeAreaView style={styles.screenStyle} edges={[]}>
      {loading ? <HeaderLoader /> : null}
      <View style={style.header}>
        <View>
          <Text fontSize={18} weight="bold">
            Edit Event
          </Text>
          <Text fontSize={14} weight="light">
            {fetchedEvent.title}
          </Text>
        </View>

        <Pressable onPress={() => navigation.goBack()}>
          <Icon name={'close-outline'} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        style={{ padding: 22 }}>
        <Text fontSize={18} weight="bold">
          Title
        </Text>
        <Separator />
        <TextInput
          onChangeText={(text) => onChangeText('title', text)}
          value={stagedEvent.title}
          style={style.input}
        />
        <Separator size={'md'} />
        <Text fontSize={18} weight="bold">
          Description
        </Text>
        <Separator />
        <TextInput
          value={stagedEvent.description}
          style={[style.input, { maxHeight: 200 }]}
          onChangeText={(text) => onChangeText('description', text)}
          multiline
        />
        <Separator size={'md'} />
        <View
          style={{
            borderRadius: 8,
            backgroundColor: colors.secondaryBackground,
          }}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: 16,
            }}
            onPress={() => setCalendar(!expandCalendar)}>
            <View>
              <Text fontSize={18} weight="bold">
                Date & Time
              </Text>
              <Separator />
              <Text>
                {moment(stagedEvent.date).format('Do, MMMM, YYYY hh:mm A')}
              </Text>
            </View>
            <Icon name={`chevron-${expandCalendar ? 'up' : 'down'}-outline`} />
          </Pressable>
          <Collapsible expanded={expandCalendar}>
            <Separator size={'md'} />
            <CalendarProvider
              width={width - 54}
              onDateChange={(selectedDate) => {
                setStagedEvent((data) => ({
                  ...data,
                  date: selectedDate.toString(),
                }));
              }}
            />
          </Collapsible>
        </View>
      </ScrollView>
      <SolidButton
        onPress={onUpdatedPressed}
        style={{
          position: 'absolute',
          bottom: insets.bottom,
          alignSelf: 'center',
        }}>
        <Text weight="bold">Save</Text>
      </SolidButton>
    </SafeAreaView>
  );
};

export default EditEventScreen;
