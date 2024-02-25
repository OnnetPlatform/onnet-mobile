import { AlertProvider } from '@Context/AlertContext/AlertProvider';
import { BottomSheetProvider } from '@Context/BottomSheet';
import { EventProivder } from '@Context/EventContext/EventProvider';
import { DatabaseProvider } from '@Khayat/Providers/DatabaseProvider';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appId, baseUrl } from '../../../../atlas.config.json';
import { OnnetProvider } from '../../../Provider/OnnetProvider';
import { AuthStack } from '../Stacks';
import SnackbarProvider from '../../../Provider/SnackbarProvider';

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
            <BottomSheetProvider>
              <NavigationContainer theme={navTheme}>
                <DatabaseProvider id={appId} baseUrl={baseUrl}>
                  <AlertProvider>
                    <EventProivder>
                      <SnackbarProvider>
                        <AuthStack />
                      </SnackbarProvider>
                    </EventProivder>
                  </AlertProvider>
                </DatabaseProvider>
              </NavigationContainer>
            </BottomSheetProvider>
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
