import { AuthState } from '../../Reducers/AuthReducer/types';
import { AuthSelector } from '../../Selectors/AuthSelector';
import { call, fork, select } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import {
  createSocketConnectionChannel,
  createDirectMessageChannel,
  createTypingChannel,
  createNewUserConnectedChannel,
  createConnectedUsersChannel,
  createUserDisconnectedChannel,
  createSocketDisconnectionChannel,
  createTypingStoppedChannel,
} from './channels';
import {
  onConnect,
  onMessage,
  onNewUserConnected,
  onTyping,
  onTypingStopped,
  onConnectedUsers,
  onUserDisconnected,
  onDisconnect,
} from './events';
import {
  disconnect,
  sendMessage,
  sendTyping,
  sendTypingStopped,
} from './actions';

const socketConfig = {
  transports: ['websocket'],
  autoConnect: true,
};
export function* connectToServer(): any {
  try {
    const { access_token }: AuthState = yield select(AuthSelector);

    const socket: Socket = yield call(requestAuthorization, access_token);
    const conncetionSub = yield call(createSocketConnectionChannel, socket);
    const disconncetionSub = yield call(
      createSocketDisconnectionChannel,
      socket
    );
    const dmSub = yield call(createDirectMessageChannel, socket);
    const typingSub = yield call(createTypingChannel, socket);
    const typingStoppedSub = yield call(createTypingStoppedChannel, socket);
    const userConncetedSub = yield call(createNewUserConnectedChannel, socket);
    const connectedUsersSub = yield call(createConnectedUsersChannel, socket);
    const disconnectedUsersSub = yield call(
      createUserDisconnectedChannel,
      socket
    );

    // users subscriptions
    yield fork(onNewUserConnected, userConncetedSub);
    yield fork(onConnectedUsers, connectedUsersSub);
    yield fork(onUserDisconnected, disconnectedUsersSub);

    // chat subscriptions
    yield fork(onConnect, conncetionSub);
    yield fork(onDisconnect, disconncetionSub);
    yield fork(onMessage, dmSub);
    yield fork(onTyping, typingSub);
    yield fork(onTypingStopped, typingStoppedSub);

    // chat actions

    // @ts-ignore
    yield fork(sendMessage, socket);
    yield fork(sendTyping, socket);
    yield fork(sendTypingStopped, socket);
    yield fork(disconnect, socket);
  } catch (error) {
    console.log(error);
  }
}

const requestAuthorization = (access_token: string) => {
  const socket = io('http://192.168.1.5:80', {
    ...socketConfig,
    query: {
      token: access_token,
    },
  });
  return new Promise((resolve) => resolve(socket));
};
