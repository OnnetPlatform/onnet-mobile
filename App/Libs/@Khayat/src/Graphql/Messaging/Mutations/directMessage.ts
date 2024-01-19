import { gql } from '@apollo/client';

const directMessageMutation = gql`
  mutation DirectMessageMutation($input: DirectMessageInput!) {
    directMessage(directMessageInput: $input) {
      id
      textMessage
      sender {
        email
        first_name
        last_name
        id
      }
      reciever {
        email
        first_name
        last_name
        id
      }
      createdAt
      updatedAt
    }
  }
`;
export default directMessageMutation;
