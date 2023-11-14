import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { AppTypes, AuthTypes } from '../../Redux';
import { startUp } from './AppSaga';
import { signUp } from './AuthSaga';

export default function* () {
  yield all([
    takeEvery(AppTypes.START_UP, startUp),
    takeLatest(AuthTypes.SIGN_UP, signUp),
  ]);
}
