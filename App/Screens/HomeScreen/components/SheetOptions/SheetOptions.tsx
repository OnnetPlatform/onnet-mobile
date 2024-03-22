import Icon from '@Atoms/Icon';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { useBottomSheet } from '@Context/BottomSheet';
import { useAppNavigation } from '@Hooks/useAppNavigation';
import { SettingsCreators } from '@Khayat/Redux/Actions/SettingsActions/SettingsActions';
import { CalendarStyle } from '@Khayat/Redux/Reducers/SettingsReducer/types';
import { SettingsSelector } from '@Khayat/Redux/Selectors/SettingsSelector';
import { useColors } from '@Theme/index';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const SheetOptions: React.FC = () => {
  const colors = useColors();
  const navigation = useAppNavigation();
  const { hideBottomSheet } = useBottomSheet();
  const { calendarStyle } = useSelector(SettingsSelector);
  const dispatch = useDispatch();
  const onCreateMeetingPressed = () => {
    hideBottomSheet();
    navigation.navigate('EventInfo');
  };
  return (
    <View style={{ width: '100%', paddingTop: 16 }}>
      <Pressable
        onPress={() => {
          hideBottomSheet();
          dispatch(
            SettingsCreators.setCalendarStyle(
              calendarStyle === CalendarStyle.LIST
                ? CalendarStyle.TABLE
                : CalendarStyle.LIST
            )
          );
        }}
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.secondaryBackground,
        }}>
        <Icon name={'grid-outline'} />
        <Separator size={'md'} horizontal />
        <Text weight="bold" style={{ textTransform: 'uppercase' }}>
          Change style
        </Text>
      </Pressable>
      <Pressable
        onPress={onCreateMeetingPressed}
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.secondaryBackground,
        }}>
        <Icon name={'plus-outline'} />
        <Separator size={'md'} horizontal />
        <Text weight="bold" style={{ textTransform: 'uppercase' }}>
          Create Meeting
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.secondaryBackground,
        }}>
        <Icon name={'compass-outline'} />
        <Separator size={'md'} horizontal />
        <Text weight="bold" style={{ textTransform: 'uppercase' }}>
          Navigate to now
        </Text>
      </View>
    </View>
  );
};

export default SheetOptions;
