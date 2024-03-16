import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  AppTypes,
  AuthTypes,
  ConferenceTypes,
  EventActions,
  UserTypes,
} from '../../Redux';
import { startUp } from './AppSaga';
import { register, login } from './AuthSaga';
import { connectToServer } from './messaging/saga';
import connectConference from './conference/saga';
import { createEvent, getEvents } from './events/saga';
import { BulletinTypes } from '../Actions/BulletinActions';
import { stream } from './bulletin/streamer/saga';
import { joinBulletin } from './bulletin/viewer/saga';
import {
  createWorkspace,
  getUserWorkspaces,
  joinWorkspace,
  updateProfile,
} from './user/saga';

export default function* () {
  yield all([
    takeEvery(AppTypes.START_UP, startUp),
    takeEvery(AppTypes.START_UP, connectToServer),
    takeLatest(AuthTypes.REGISTER, register),
    takeLatest(AuthTypes.LOGIN, login),
    takeLatest(EventActions.GET_EVENTS, getEvents),
    takeLatest(EventActions.CREATE_EVENT, createEvent),
    takeLatest(UserTypes.SET_CURRENT_WORKSPACE, connectToServer),
    takeEvery(ConferenceTypes.CONNECT, connectConference),
    takeLatest(BulletinTypes.STREAM, stream),
    takeLatest(BulletinTypes.JOIN_BULLETIN, joinBulletin),
    takeLatest(UserTypes.GET_USER_WORKSPACES, getUserWorkspaces),
    takeLatest(UserTypes.CREATE_WORKSPACE, createWorkspace),
    takeLatest(UserTypes.JOIN_WORKSPACE, joinWorkspace),
    takeLatest(UserTypes.UPDATE_PROFILE, updateProfile),
  ]);
}
