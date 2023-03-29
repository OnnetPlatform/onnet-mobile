import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from '../Stacks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { CreateEventSheet } from '../../../Screens/ConferenceScreen/components';
import SocketContext from '../../../Context/SocketContext/SocketContext';

export const MainNavigator: React.FC = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <SafeAreaProvider>
          <SocketContext>
            <AuthStack />
            <CreateEventSheet onClose={function (): void {}} />
          </SocketContext>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};
export default MainNavigator;
