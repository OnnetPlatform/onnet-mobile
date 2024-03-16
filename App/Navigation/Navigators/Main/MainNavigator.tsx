import { AlertProvider } from '@Context/AlertContext/AlertProvider';
import { BottomSheetProvider } from '@Context/BottomSheet';
import { EventProivder } from '@Context/EventContext/EventProvider';
import { DatabaseProvider } from '@Khayat/Providers/DatabaseProvider';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appId, baseUrl } from '../../../../atlas.config.json';
import { OnnetProvider } from '../../../Provider/OnnetProvider';
import SnackbarProvider from '../../../Provider/SnackbarProvider';

import * as Sentry from '@sentry/react-native';
import { AuthStack } from '..';
import { enableScreens } from 'react-native-screens';
enableScreens();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export const MainNavigator: React.ComponentType = Sentry.wrap(() => {
  return (
    <Suspense fallback={<View />}>
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaProvider>
        <OnnetProvider>
          <GestureHandlerRootView style={styles.mainContainer}>
            <NavigationContainer theme={navTheme}>
              <BottomSheetProvider>
                {/* @ts-ignore */}
                <DatabaseProvider id={appId} baseUrl={baseUrl}>
                  <AlertProvider>
                    <EventProivder>
                      <SnackbarProvider>
                        <AuthStack />
                      </SnackbarProvider>
                    </EventProivder>
                  </AlertProvider>
                </DatabaseProvider>
              </BottomSheetProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </OnnetProvider>
      </SafeAreaProvider>
    </Suspense>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
  },
});

export default MainNavigator;
