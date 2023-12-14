import { Socket } from 'socket.io-client';
import {
  MessagingCreators,
  MessagingTypes,
} from '../../Actions/MessagingActions';
import { TakeEffect, put, take } from 'redux-saga/effects';
import { MessagingEvents } from './types';
import { AuthTypes } from '../../Actions/AuthActions';

export function* sendMessage(socket: Socket): Generator<TakeEffect, any, any> {
  while (true) {
    const { message } = yield take(MessagingTypes.SEND_MESSAGE);
    socket.emit(MessagingEvents.SEND_MESSAGE, message);
  }
}
export function* sendTyping(socket: Socket): Generator<TakeEffect, any, any> {
  while (true) {
    const { user } = yield take(MessagingTypes.TYPING);
    socket.emit(MessagingEvents.TYPING, user);
  }
}
export function* sendTypingStopped(
  socket: Socket
): Generator<TakeEffect, any, any> {
  while (true) {
    const { user } = yield take(MessagingTypes.TYPING_STOPPED);
    socket.emit(MessagingEvents.STOPPED_TYPING, user);
  }
}
export function* disconnect(socket: Socket) {
  while (true) {
    yield take(AuthTypes.RESET);
    socket.disconnect();
    yield put(MessagingCreators.setConnected(false));
  }
}
