import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientLayout } from '../../Components/HOCs';
import { CreateEventSheet } from '../ConferenceScreen/components';
import { EventsList } from './components';
import styles from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  return (
    <>
      <GradientLayout>
        <SafeAreaView edges={['left', 'right']} style={[styles.screen]}>
          <EventsList
            onCreatePressed={() => {
              setOpenSheet(true);
            }}
          />
        </SafeAreaView>
      </GradientLayout>
      <CreateEventSheet open={openSheet} onClose={() => setOpenSheet(false)} />
    </>
  );
};
export default HomeScreen;
