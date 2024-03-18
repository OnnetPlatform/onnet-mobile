import * as Sentry from '@sentry/react-native';
import { LogBox } from 'react-native';
import Config from 'react-native-config';
import React, { Suspense, lazy } from 'react';
import { Loading } from '@Atoms/Loading/Loading';
import Texture from '@Skia/Texture/Texture';
import { Polyrhythms } from '@Skia/Polyrhythms/Polyrhythms';

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
    <Suspense
      fallback={
        <>
          <Texture />
          <Polyrhythms />
        </>
      }>
      <MainNavigator />
    </Suspense>
  );
};
