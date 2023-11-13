import { all, takeEvery } from 'redux-saga/effects';
import { AppTypes } from '../../Redux';
import { startUp } from './AppSaga';

export default function* () {
  yield all([takeEvery(AppTypes.START_UP, startUp)]);
}
