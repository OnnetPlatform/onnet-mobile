import { Profile } from '../../../Graphql/Profile/Mutations/types';

export type RoleTypes = 'ADMIN' | 'MODERATOR' | 'EDITOR';
export type Workspace = {
  name: string;
  _id: string;
};

export type RolesWorkspaces = {
  type: RoleTypes;
  workspace: Workspace;
};

export type UserReducerType = {
  user: any;
  workspaces: RolesWorkspaces[];
  current_workspace: {
    workspace: Workspace;
    workspace_access_token: string;
  };
  profile?: Profile;
};
