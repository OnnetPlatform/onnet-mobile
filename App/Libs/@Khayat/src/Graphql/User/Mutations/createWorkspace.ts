import { gql } from '@apollo/client';

export const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput) {
    createWorkspace(createWorkspaceInput: $input) {
      workspace {
        _id
        name
      }
      workspace_access_token
    }
  }
`;
