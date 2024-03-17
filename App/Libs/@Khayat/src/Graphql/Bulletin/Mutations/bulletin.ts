import { gql } from '@apollo/client';

export const CREATE_BULLETIN_MUTATION = gql`
  mutation Bulletin($input: BulletinInput!) {
    bulletin(bulletinInput: $input) {
      id
      title
      status
      duration
      startDate
      createdAt
    }
  }
`;
