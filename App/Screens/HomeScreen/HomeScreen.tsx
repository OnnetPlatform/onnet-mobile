import { EventCreators } from '@Khayat/Redux';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import styles from './HomeScreen.styles';
import { EventsList, OptionButton } from './components';
import { useSharedValue } from 'react-native-reanimated';
import { SettingsSelector } from '@Khayat/Redux/Selectors/SettingsSelector';
import { CalendarStyle } from '@Khayat/Redux/Reducers/SettingsReducer/types';
import EventCalendar from '@Molecules/EventCalendar';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const expandButton = useSharedValue(1);
  const { calendarStyle } = useSelector(SettingsSelector);
  useEffect(() => {
    if (isFocused) {
      dispatch(EventCreators.getEvents());
    }
  }, [isFocused]);

  return (
    <SafeAreaView edges={['left', 'right']} style={[styles.screen]}>
      {calendarStyle === CalendarStyle.TABLE ? (
        <EventCalendar expandButton={expandButton} />
      ) : (
        <EventsList expandButton={expandButton} />
      )}
      <OptionButton expandButton={expandButton} />
    </SafeAreaView>
  );
};
export default HomeScreen;
