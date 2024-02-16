import { gql } from '@apollo/client';
import { AuthData } from '../../Redux/Actions/AuthActions/types';

export const RegisterMutation = gql`
  mutation Register($input: RegisterationInput!) {
    register(registerationInput: $input) {
      access_token
      id
      email
    }
  }
`;

export const LoginQuery = gql`
  query Login($input: LoginInput!) {
    login(loginInput: $input) {
      access_token
      id
      email
    }
  }
`;

export interface RegisterResponse {
  data: { register: AuthData };
}
export interface LoginResponse {
  data: { login: AuthData };
}
