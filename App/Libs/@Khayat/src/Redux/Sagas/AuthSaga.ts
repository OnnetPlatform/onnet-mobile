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
import { setAppLink } from './AppSaga';

export function* register({ credentials }: { credentials: Credentials }) {
  try {
    const result: RegisterResponse = yield client.mutate({
      mutation: RegisterMutation,
      variables: { input: credentials },
    });

    yield put(AuthCreators.setAuthData(result.data.register));
    setAppLink(result.data.register.access_token);
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
    yield put(AuthCreators.setAuthData(result.data.login));
    setAppLink(result.data.login.access_token);
  } catch (error) {
    console.log(error);
  }
}
