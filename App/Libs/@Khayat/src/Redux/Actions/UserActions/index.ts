import { createActions } from 'reduxsauce';
import type { UserActionTypes, UserCreatorsTypes } from './types';

export const { Types: UserTypes, Creators: UserCreators } = createActions<
  UserActionTypes,
  UserCreatorsTypes
>(
  {
    getCurrentUser: null,
    getUserWorkspaces: null,
    setUserWorkspaces: ['workspaces'],
    createWorkspace: ['name'],
    setCurrentWorkspace: ['current_workspace'],
    joinWorkspace: ['workspace_id'],
    setProfile: ['profile'],
    updateProfile: ['profile', 'onUpdate'],
  },
  { prefix: '/User' }
);
