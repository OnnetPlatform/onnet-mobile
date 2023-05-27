import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateEventSheetRef } from '../../Services/CreateEventRef/CreateEventRef';
import { EventsList } from './components';
import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['left', 'right']} style={[styles.screen]}>
      <EventsList
        onCreatePressed={() => {
          CreateEventSheetRef.current?.snapToIndex(0);
        }}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
