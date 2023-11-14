import client from '../../Graphql/Client';
import { Credentials } from '../Reducers/AuthReducer/types';
import { RegisterMutation, RegisterResponse } from '../../Graphql/Auth/Auth';
import { put } from 'redux-saga/effects';
import { AuthCreators } from '..';

export function* signUp({ credentials }: { credentials: Credentials }) {
  const result: RegisterResponse = yield client.mutate({
    mutation: RegisterMutation,
    variables: { input: credentials },
  });
  yield put(AuthCreators.setAccessToken(result.data.register.access_token));
}
