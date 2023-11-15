import { Socket } from 'socket.io-client';
import { MessagingTypes } from '../../Actions/MessagingActions';
import { TakeEffect, take } from 'redux-saga/effects';
import { MessagingEvents } from './types';

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
