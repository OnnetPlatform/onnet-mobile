import { EventCreators } from '@Khayat/Redux';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { EventsList } from './components';
import styles from './HomeScreen.styles';
import { useAppNavigation } from '@Hooks/useAppNavigation';
import EventCalendar from '@Molecules/EventCalendar';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useAppNavigation();

  useEffect(() => {
    if (isFocused) {
      dispatch(EventCreators.getEvents());
    }
  }, [isFocused]);
  return (
    <SafeAreaView edges={['left', 'right']} style={[styles.screen]}>
      <EventCalendar />
    </SafeAreaView>
  );
};
export default HomeScreen;
