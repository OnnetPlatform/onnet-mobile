import { createActions } from 'reduxsauce';
import { AuthActionCreatorTypes, AuthActionTypes } from './types';

export const { Types: AuthTypes, Creators: AuthCreators } = createActions<
  AuthActionTypes,
  AuthActionCreatorTypes
>({
  reset: null,
  setAccessToken: ['access_token'],
  register: ['credentials'],
  login: ['credentials'],
});
