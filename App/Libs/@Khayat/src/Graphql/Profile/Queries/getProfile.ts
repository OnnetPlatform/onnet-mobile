import { gql } from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
  query Profile($input: GetProfileInput) {
    profile(input: $input) {
      username
      avatar
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
    }
  }
`;
