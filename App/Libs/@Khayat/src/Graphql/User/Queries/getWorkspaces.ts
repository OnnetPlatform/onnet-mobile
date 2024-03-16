import { gql } from '@apollo/client';

export const GET_WORKSPACES_QUERY = gql`
  query GetUserWorkspaces {
    getUserWorkspaces {
      type
      workspace {
        name
        _id
      }
    }
  }
`;
