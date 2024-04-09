import { gql } from '@apollo/client';

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: ProfileInput) {
    updateProfile(input: $input) {
      username
      avatar
      bio
      cover
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
