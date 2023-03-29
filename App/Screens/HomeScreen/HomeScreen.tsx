import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientLayout } from '../../Components/HOCs';
import { CreateEventSheetRef } from '../../Services/CreateEventRef/CreateEventRef';
import { EventsList } from './components';
import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  return (
    <>
      <GradientLayout>
        <SafeAreaView edges={['left', 'right']} style={[styles.screen]}>
          <EventsList
            onCreatePressed={() => {
              CreateEventSheetRef.current?.snapToIndex(0);
            }}
          />
        </SafeAreaView>
      </GradientLayout>
    </>
  );
};
export default HomeScreen;
