import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import MessagingReducer from './MessagingReducer';
import Conference from './Conference';
import Events from './EventReducer';
import Bulletin from './BulletinReducer';
import SettingsReducer from './SettingsReducer/SettingsReducer';

export const ReducersWhiteList = [
  'AuthReducer',
  'UserReducer',
  'SettingsReducer',
];
export default combineReducers({
  UserReducer,
  AuthReducer,
  MessagingReducer,
  Conference,
  Events,
  Bulletin,
  SettingsReducer,
});
