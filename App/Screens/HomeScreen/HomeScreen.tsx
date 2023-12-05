import { EventCreators } from '@Khayat/Redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { EventsList } from './components';
import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      dispatch(EventCreators.getEvents());
    }
  }, [isFocused]);
  return (
    <SafeAreaView edges={['left', 'right']} style={[styles.screen]}>
      <EventsList
        onCreatePressed={() => {
          // @ts-ignore
          navigation.navigate('EventInfo');
        }}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
