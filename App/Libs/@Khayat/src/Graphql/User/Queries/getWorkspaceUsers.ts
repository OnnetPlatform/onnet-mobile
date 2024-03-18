import { gql } from '@apollo/client';

export const GET_WORKSPACE_USERS = gql`
  query GetWorkspaceUsers {
    getWorkspaceUsers {
      id
      username
      bio
      cover
      workspace
      user
      active
      status
      title
      city
      country
      department
      phone
      last_name
      first_name
      full_name
      avatar
    }
  }
`;
