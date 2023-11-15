import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';
import MessagingReducer from './MessagingReducer';

export const ReducersWhiteList = ['AuthReducer'];

export default combineReducers({
  UserReducer,
  AuthReducer,
  MessagingReducer,
});
