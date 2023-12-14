import { createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { UserTypes } from '../../Actions';
import type { UserReducerType } from './types';

type State = ImmutableObject<UserReducerType>;

const initial_value = Immutable<UserReducerType>({
  user: {},
});
const setCurrentUser = (state: State, { user }: { user: any }) =>
  state.merge({ ...state, user });

const handlers = {
  [UserTypes.GET_CURRENT_USER]: setCurrentUser,
};
export default createReducer(initial_value, handlers);
