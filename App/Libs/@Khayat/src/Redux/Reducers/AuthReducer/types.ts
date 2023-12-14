import { ImmutableObject } from 'seamless-immutable';

export type Credentials = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
export type AuthData = {
  access_token: string;
  id: string;
  email: string;
};

export type AuthState = ImmutableObject<AuthData>;
export const AuthInitialState: AuthData = {
  access_token: '',
  id: '',
  email: '',
};
