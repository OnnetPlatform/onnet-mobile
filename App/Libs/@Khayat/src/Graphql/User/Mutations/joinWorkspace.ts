import { gql } from '@apollo/client';

export const JOIN_WORKSPACE_MUTATION = gql`
  mutation JoinWorkspace($data: JoinWorkspaceInput) {
    joinWorkspace(data: $data) {
      workspace_access_token
      workspace {
        _id
        name
        verified
        createdAt
      }
    }
  }
`;
