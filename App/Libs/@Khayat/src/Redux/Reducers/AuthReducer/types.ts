import { ImmutableObject } from 'seamless-immutable';

export const AuthInitialState = { access_token: '' };

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
};

export type AuthState = ImmutableObject<AuthData>;
