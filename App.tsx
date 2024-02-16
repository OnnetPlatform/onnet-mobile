import * as Sentry from '@sentry/react-native';
import {LogBox} from 'react-native';
import Config from 'react-native-config';

import {MainNavigator} from './App/Navigation';

LogBox.ignoreAllLogs();
console.log(Config.SENTRY_DSN);
Sentry.init({
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export default Sentry.wrap(MainNavigator);
