import { ImmutableObject } from 'seamless-immutable';

export const AuthInitialState = { access_token: '' };
export type AuthData = {
  access_token: string;
};

export type AuthState = ImmutableObject<AuthData>;
