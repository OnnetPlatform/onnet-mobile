import { TakeableChannel } from 'redux-saga';
import {
  RolesWorkspaces,
  UserReducerType,
} from '../../Reducers/UserReducer/types';
import { Profile } from '../../../Graphql/Profile/Mutations/types';

export type UserActionTypes = {
  GET_CURRENT_USER: 'GET_CURRENT_USER';
  SET_USER_WORKSPACES: 'SET_USER_WORKSPACES';
  GET_USER_WORKSPACES: 'GET_USER_WORKSPACES';
  SET_CURRENT_WORKSPACE: 'SET_CURRENT_WORKSPACE';
  CREATE_WORKSPACE: TakeableChannel<{ name: string }>;
  JOIN_WORKSPACE: TakeableChannel<{ workspace_id: string }>;
  SET_PROFILE: 'SET_PROFILE';
  UPDATE_PROFILE: TakeableChannel<{ profile: Partial<Profile> }>;
};

export type UserCreatorsTypes = {
  getCurrentUser(): any;
  getUserWorkspaces(): any;
  setUserWorkspaces(workspaces: RolesWorkspaces[]): any;
  createWorkspace(name: string): any;
  setCurrentWorkspace(
    current_workspace: UserReducerType['current_workspace']
  ): any;
  joinWorkspace(workspace_id: string): any;
  setProfile(profile: Profile): any;
  updateProfile(profile: Partial<Profile>, onUpdate?: () => void): any;
};
