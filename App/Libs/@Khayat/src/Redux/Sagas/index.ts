import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  AppTypes,
  AuthTypes,
  ConferenceTypes,
  EventActions,
} from '../../Redux';
import { startUp } from './AppSaga';
import { register, login } from './AuthSaga';
import { connectToServer } from './messaging/saga';
import connectConference from './conference/saga';
import { createEvent, getEvents } from './events/saga';
import { BulletinTypes } from '../Actions/BulletinActions';
import { stream } from './bulletin/streamer/saga';
import { joinBulletin } from './bulletin/viewer/saga';

export default function* () {
  yield all([
    takeEvery(AppTypes.START_UP, startUp),
    takeEvery(AppTypes.START_UP, connectToServer),
    takeLatest(AuthTypes.REGISTER, register),
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(EventActions.GET_EVENTS, getEvents),
    takeLatest(EventActions.CREATE_EVENT, createEvent),
    takeLatest(AuthTypes.SET_AUTH_DATA, connectToServer),
    takeEvery(ConferenceTypes.CONNECT, connectConference),
    takeLatest(BulletinTypes.STREAM, stream),
    takeLatest(BulletinTypes.JOIN_BULLETIN, joinBulletin),
  ]);
}
