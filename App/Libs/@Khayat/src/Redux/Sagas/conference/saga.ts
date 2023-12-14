import { call, fork } from 'redux-saga/effects';
import { Socket, io } from 'socket.io-client';

import {
  createConnectionChannel,
  shouldOfferChannel,
  createAnswerChannel,
  createOfferChannel,
  createJoinedUsersChannel,
  createIceCandidateChannel,
  createDiconnectionChannel,
} from './channels';
import {
  onAnswer,
  onCandidate,
  onConnected,
  onDisconnected,
  onJoinedUsers,
  onOffer,
  onShouldOffer,
} from './events';
import {
  disconnect,
  sendAnswer,
  sendCandidate,
  sendJoinEvent,
  sendOffer,
} from './actions';

export default function* (): Generator<any, any, any> {
  const socket: Socket = yield call(requestAuthorization);
  const connectionSub = yield call(createConnectionChannel, socket);
  const disconnectionSub = yield call(createDiconnectionChannel, socket);
  const joinedUsersSub = yield call(createJoinedUsersChannel, socket);
  const shouldCreateOfferSub = yield call(shouldOfferChannel, socket);
  const offerSub = yield call(createOfferChannel, socket);
  const answerSub = yield call(createAnswerChannel, socket);
  const iceCandidateSub = yield call(createIceCandidateChannel, socket);

  // Events

  yield fork(onConnected, connectionSub);
  yield fork(onDisconnected, disconnectionSub);
  yield fork(onJoinedUsers, joinedUsersSub);
  yield fork(onShouldOffer, shouldCreateOfferSub);
  yield fork(onOffer, offerSub);
  yield fork(onAnswer, answerSub);
  yield fork(onCandidate, iceCandidateSub);

  // Actions

  yield fork(sendOffer, socket);
  yield fork(sendAnswer, socket);
  yield fork(sendCandidate, socket);
  yield fork(sendJoinEvent, socket);
  yield fork(disconnect, socket);
}

const requestAuthorization = () => {
  const socket = io('http://192.168.1.5:90', {
    transports: ['websocket'],
    autoConnect: true,
  });
  return new Promise((resolve) => resolve(socket));
};
