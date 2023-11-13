import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';

export const ReducersWhiteList = ['AuthReducer'];
export default combineReducers({ UserReducer, AuthReducer });
