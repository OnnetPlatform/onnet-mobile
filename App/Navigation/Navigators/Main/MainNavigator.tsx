import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import QueueContext from '../../../Context/QueueContext/QueueContext';
import SocketContext from '../../../Context/SocketContext/SocketContext';
import WebrtcProvider from '../../../Context/WebrtcContext';
import { RealmProvider } from '../../../Hooks/useRealmContext';
import { OnnetProvider } from '../../../Provider/OnnetProvider';
import { CreateEventSheet } from '../../../Screens/ConferenceScreen/components';
import { AuthStack } from '../Stacks';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export const MainNavigator: React.FC = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        <OnnetProvider>
          <NavigationContainer theme={navTheme}>
            <RealmProvider schemaVersion={9}>
              <SocketContext>
                <QueueContext>
                  <WebrtcProvider>
                    <AuthStack />
                  </WebrtcProvider>
                  <CreateEventSheet onClose={function (): void {}} />
                </QueueContext>
              </SocketContext>
            </RealmProvider>
          </NavigationContainer>
        </OnnetProvider>
      </SafeAreaProvider>
    </>
  );
};
export default MainNavigator;
