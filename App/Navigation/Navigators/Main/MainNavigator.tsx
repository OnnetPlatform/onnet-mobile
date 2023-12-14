import { EventProivder } from '@Context/EventContext/EventProvider';
import { DatabaseProvider } from '@Khayat/Providers/DatabaseProvider';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AlertProvider } from '../../../Context/AlertContext/AlertProvider';
import { OnnetProvider } from '../../../Provider/OnnetProvider';
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
          <GestureHandlerRootView style={styles.mainContainer}>
            <NavigationContainer theme={navTheme}>
              <DatabaseProvider>
                <AlertProvider>
                  <EventProivder>
                    <AuthStack />
                  </EventProivder>
                </AlertProvider>
              </DatabaseProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </OnnetProvider>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
  },
});

export default MainNavigator;
