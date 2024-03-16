import { createReducer, resettableReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import { AuthTypes, UserTypes } from '../../Actions';
import type { RolesWorkspaces, UserReducerType } from './types';

type State = ImmutableObject<UserReducerType>;

const initial_value = Immutable<UserReducerType>({
  user: {},
  workspaces: [],
  current_workspace: {
    workspace: {
      name: '',
      _id: '',
    },
    workspace_access_token: '',
  },
  profile: undefined,
});
const setCurrentUser = (state: State, { user }: { user: any }) =>
  state.merge({ ...state, user });

const setUserWokspaces = (
  state: State,
  { workspaces }: { workspaces: RolesWorkspaces[] }
) => state.merge({ ...state, workspaces });

const setCurrentWokspace = (
  state: State,
  {
    current_workspace,
  }: { current_workspace: UserReducerType['current_workspace'] }
) => state.merge({ ...state, current_workspace });

const setProfile = (
  state: State,
  { profile }: { profile: UserReducerType['profile'] }
) => state.merge({ ...state, profile });

const handlers = {
  [UserTypes.GET_CURRENT_USER]: setCurrentUser,
  [UserTypes.SET_USER_WORKSPACES]: setUserWokspaces,
  [UserTypes.SET_CURRENT_WORKSPACE]: setCurrentWokspace,
  [UserTypes.SET_PROFILE]: setProfile,
};

const UserReducer = createReducer(initial_value, handlers);
export default resettableReducer(AuthTypes.RESET, UserReducer);
