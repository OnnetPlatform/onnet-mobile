import {
  CallEffect,
  PutEffect,
  TakeEffect,
  call,
  put,
  take,
} from 'redux-saga/effects';
import { ConferenceCreators, ConferenceTypes } from '../../Actions/Conference';
import { Socket } from 'socket.io-client';
import { ConferenceEvents } from './types';
import { getLocalStream } from './utils';
import { MediaStreamTrack } from 'react-native-webrtc';
export function* sendOffer(socket: Socket): Generator<TakeEffect, any, any> {
  while (true) {
    const { data } = yield take(ConferenceTypes.SEND_OFFER);
    socket.emit(ConferenceEvents.OFFER, data);
  }
}
export function* sendAnswer(socket: Socket): Generator<TakeEffect, any, any> {
  while (true) {
    const { data } = yield take(ConferenceTypes.SEND_ANSWER);
    socket.emit(ConferenceEvents.ANSWER, data);
  }
}
export function* sendCandidate(
  socket: Socket
): Generator<TakeEffect, any, any> {
  while (true) {
    const { data } = yield take(ConferenceTypes.SEND_CANDIDATE);
    socket.emit(ConferenceEvents.CANDIDATE, data);
  }
}

export function* sendJoinEvent(
  socket: Socket
): Generator<TakeEffect | PutEffect | CallEffect, any, any> {
  while (true) {
    yield take(ConferenceTypes.JOIN);
    yield put(ConferenceCreators.setJoined(true));
    const localStream = yield call(getLocalStream);
    localStream.getAudioTracks().map((track: MediaStreamTrack) => {
      track.enabled = false;
    });
    localStream.getVideoTracks().map((track: MediaStreamTrack) => {
      track.enabled = false;
    });
    yield put(ConferenceCreators.setLocalStream(localStream));
    socket.emit(ConferenceEvents.JOIN);
  }
}
export function* disconnect(
  socket: Socket
): Generator<TakeEffect | PutEffect, any, any> {
  while (true) {
    yield take(ConferenceTypes.DISCONNECT);
    socket.close();
  }
}
