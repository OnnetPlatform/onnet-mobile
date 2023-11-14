import { TakeableChannel } from 'redux-saga';
import {
  Credentials,
  LoginCredentials,
} from '../../Reducers/AuthReducer/types';

export type AuthActionTypes = {
  RESET: 'REST';
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN';
  REGISTER: TakeableChannel<{ credentials: Credentials }>;
  LOGIN: TakeableChannel<{ credentials: LoginCredentials }>;
};

export type AuthActionCreatorTypes = {
  reset(): any;
  setAccessToken(access_token: string): any;
  register(credentials: Credentials): any;
  login(credentials: LoginCredentials): any;
};
