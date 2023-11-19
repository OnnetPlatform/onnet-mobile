import { createActions } from 'reduxsauce';
import { AuthActionCreatorTypes, AuthActionTypes } from './types';

export const { Types: AuthTypes, Creators: AuthCreators } = createActions<
  AuthActionTypes,
  AuthActionCreatorTypes
>({
  reset: null,
  setAccessToken: ['auth_data'],
  register: ['credentials'],
  login: ['credentials'],
  setAuthData: ['data'],
});
