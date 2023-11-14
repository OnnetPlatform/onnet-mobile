import { TakeableChannel } from 'redux-saga';
import { Credentials } from '../../Reducers/AuthReducer/types';

export type AuthActionTypes = {
  RESET: 'REST';
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN';
  SIGN_UP: TakeableChannel<Credentials>;
};

export type AuthActionCreatorTypes = {
  reset(): any;
  setAccessToken(access_token: string): any;
  signUp(credentials: Credentials): any;
};
