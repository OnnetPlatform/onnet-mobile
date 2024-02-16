import Immutable from 'seamless-immutable';
import { AuthData, AuthInitialState, AuthState } from './types';
import { createReducer, resettableReducer } from 'reduxsauce';
import { AuthTypes } from '../../Actions';

const initialState = Immutable<AuthData>(AuthInitialState);

const setAccessToken = (state: AuthState, data: AuthData) =>
  state.merge({ ...data });

const setAuthData = (state: AuthState, { data }: { data: AuthData }) =>
  state.merge({ ...data });

const handlers = {
  [AuthTypes.SET_ACCESS_TOKEN]: setAccessToken,
  [AuthTypes.SET_AUTH_DATA as unknown as string]: setAuthData,
};

const AuthReducer = createReducer(initialState, handlers);
export default resettableReducer(AuthTypes.RESET, AuthReducer);
