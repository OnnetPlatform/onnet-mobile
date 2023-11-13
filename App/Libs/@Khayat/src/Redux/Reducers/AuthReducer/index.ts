import Immutable from 'seamless-immutable';
import { AuthData, AuthInitialState, AuthState } from './types';
import { createReducer, resettableReducer } from 'reduxsauce';
import { AuthTypes } from '../../Actions';

const initialState = Immutable<AuthData>(AuthInitialState);

const setAccessToken = (state: AuthState, { access_token }: AuthData) =>
  state.merge({ access_token });

const handlers = {
  [AuthTypes.SET_ACCESS_TOKEN]: setAccessToken,
};

const AuthReducer = createReducer(initialState, handlers);
export default resettableReducer(AuthTypes.RESET, AuthReducer);
