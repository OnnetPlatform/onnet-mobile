import { gql } from '@apollo/client';

const directMessageMutation = gql`
  mutation DirectMessage($input: DirectMessageInput!) {
    directMessage(directMessageInput: $input) {
      id
      textMessage
      sender {
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
      reciever {
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
      createdAt
      updatedAt
    }
  }
`;
export default directMessageMutation;
