import { DatabaseProvider } from '@Khayat/Providers/DatabaseProvider';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AlertProvider } from '../../../Context/AlertContext/AlertProvider';
import QueueContext from '../../../Context/QueueContext/QueueContext';
import SocketContext from '../../../Context/SocketContext/SocketContext';
import WebrtcProvider from '../../../Context/WebrtcContext';
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
          <AlertProvider>
            <NavigationContainer theme={navTheme}>
              <DatabaseProvider>
                <SocketContext>
                  <QueueContext>
                    <WebrtcProvider>
                      <AuthStack />
                    </WebrtcProvider>
                    <CreateEventSheet onClose={function (): void {}} />
                  </QueueContext>
                </SocketContext>
              </DatabaseProvider>
            </NavigationContainer>
          </AlertProvider>
        </OnnetProvider>
      </SafeAreaProvider>
    </>
  );
};
export default MainNavigator;
