import * as Sentry from '@sentry/react-native';
import { ActivityIndicator, LogBox, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import React, { Suspense, lazy } from 'react';

const MainNavigator = lazy(
  () => import('./App/Navigation/Navigators/Main/MainNavigator')
);
LogBox.ignoreAllLogs();

Sentry.init({
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export default () => {
  return (
    <Suspense fallback={<ActivityIndicator style={StyleSheet.absoluteFill} />}>
      <MainNavigator />
    </Suspense>
  );
};
