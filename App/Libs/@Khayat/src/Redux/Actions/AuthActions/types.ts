import { TakeableChannel } from 'redux-saga';
import {
  AuthData,
  Credentials,
  LoginCredentials,
} from '../../Reducers/AuthReducer/types';

export type AuthActionTypes = {
  RESET: 'REST';
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN';
  REGISTER: TakeableChannel<{ credentials: Credentials }>;
  LOGIN: TakeableChannel<{ credentials: LoginCredentials }>;
  SET_AUTH_DATA: TakeableChannel<{ data: AuthData }>;
};

export type AuthActionCreatorTypes = {
  reset(): any;
  setAccessToken(auth_data: AuthData): any;
  setAuthData(auth_data: AuthData): any;
  register(credentials: Credentials): any;
  login(credentials: LoginCredentials): any;
};
export { AuthData };
