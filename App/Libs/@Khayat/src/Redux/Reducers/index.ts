import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import MessagingReducer from './MessagingReducer';
import Conference from './Conference';
import Events from './EventReducer';
import Bulletin from './BulletinReducer';

export const ReducersWhiteList = ['AuthReducer'];
export default combineReducers({
  UserReducer,
  AuthReducer,
  MessagingReducer,
  Conference,
  Events,
  Bulletin,
});
