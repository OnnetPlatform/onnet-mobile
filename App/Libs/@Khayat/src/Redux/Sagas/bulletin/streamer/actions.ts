import { BulletinTypes } from '../../../Actions/BulletinActions';
import { TakeEffect, take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';

export function* sendOffer(socket: Socket): Generator<TakeEffect, any, any> {
  while (true) {
    const { data } = yield take(BulletinTypes.SEND_OFFER);
    socket.emit('stream', data);
  }
}
