import { Socket } from 'socket.io-client';
import {
  MessagingCreators,
  MessagingTypes,
} from '../../Actions/MessagingActions';
import { TakeEffect, put, take } from 'redux-saga/effects';
import { MessagingEvents } from './types';
import { AuthTypes } from '../../Actions/AuthActions';
import { FetchResult } from '@apollo/client';
import Message from '../../../Database/Models/Message';
import client from '../../../Graphql/Client';
import directMessageMutation from '../../../Graphql/Messaging/Mutations/directMessage';

export function* sendMessage(): Generator<
  TakeEffect | Promise<FetchResult<Message>>,
  any,
  { message: { textMessage: string; id: string }; callback: () => void }
> {
  while (true) {
    const { message, callback } = yield take(MessagingTypes.SEND_MESSAGE);
    try {
      yield client.mutate({
        mutation: directMessageMutation,
        variables: {
          input: {
            textMessage: message.textMessage,
            to: message.id,
          },
        },
      });
      callback();
    } catch (error: any) {
      console.log(error);
    }
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
