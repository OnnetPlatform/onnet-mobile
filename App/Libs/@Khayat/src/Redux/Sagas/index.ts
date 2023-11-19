import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { AppTypes, AuthTypes } from '../../Redux';
import { startUp } from './AppSaga';
import { register, login } from './AuthSaga';
import { connectToServer } from './messaging/saga';

export default function* () {
  yield all([
    takeEvery(AppTypes.START_UP, startUp),
    takeEvery(AppTypes.START_UP, connectToServer),
    takeLatest(AuthTypes.REGISTER, register),
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(AuthTypes.SET_AUTH_DATA, connectToServer),
  ]);
}
