import client from '../../Graphql/Client';
import { Credentials, LoginCredentials } from '../Reducers/AuthReducer/types';
import {
  RegisterMutation,
  LoginResponse,
  LoginQuery,
  RegisterResponse,
} from '../../Graphql/Auth/Auth';
import { put } from 'redux-saga/effects';
import { AuthCreators } from '..';

export function* register({ credentials }: { credentials: Credentials }) {
  try {
    const result: RegisterResponse = yield client.mutate({
      mutation: RegisterMutation,
      variables: { input: credentials },
    });
    yield put(AuthCreators.setAuthData(result.data.register));
  } catch (error) {
    console.log(error);
  }
}

export function* login({ credentials }: { credentials: LoginCredentials }) {
  console.log(credentials);
  try {
    const result: LoginResponse = yield client.query({
      query: LoginQuery,
      variables: { input: credentials },
    });
    console.log(result.data.login);
    yield put(AuthCreators.setAuthData(result.data.login));
  } catch (error) {
    console.log(error);
  }
}
