import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../Stacks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { CreateEventSheet } from '../../../Screens/ConferenceScreen/components';
import SocketContext from '../../../Context/SocketContext/SocketContext';
import QueueContext from '../../../Context/QueueContext/QueueContext';
import { RealmProvider } from '../../../Hooks/useRealmContext';
import { DefaultTheme } from '@react-navigation/native';
import { OnnetProvider } from '../../../Provider/OnnetProvider';
import WebrtcProvider from '../../../Context/WebrtcContext';

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
