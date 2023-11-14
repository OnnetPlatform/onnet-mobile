import { gql } from '@apollo/client';

export const RegisterMutation = gql`
  mutation Register($input: RegisterationInput!) {
    register(registerationInput: $input) {
      access_token
    }
  }
`;

export const LoginQuery = gql`
  query Login($input: LoginInput!) {
    login(loginInput: $input) {
      access_token
    }
  }
`;

export interface RegisterResponse {
  data: { register: { access_token: string } };
}
export interface LoginResponse {
  data: { login: { access_token: string } };
}
