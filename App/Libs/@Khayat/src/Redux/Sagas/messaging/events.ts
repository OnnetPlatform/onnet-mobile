import { ActionPattern, TakeEffect, put, take } from 'redux-saga/effects';
import { UserChat } from '../../../Database/Models/types';
import {
  createUser,
  findUser,
  reset,
  updateUser,
} from '../../../Database/Queries/User';
import { MessagingCreators } from '../../Actions/MessagingActions';

export function* onConnect(channel: ActionPattern): Generator {
  while (true) {
    yield take(channel);
    yield put(MessagingCreators.setConnected(true));
  }
}
export function* onDisconnect(channel: ActionPattern): Generator {
  while (true) {
    yield take(channel);
    yield put(MessagingCreators.setConnected(false));
    reset();
  }
}

export function* onMessage(channel: ActionPattern): Generator {
  while (true) {
    const data = yield take(channel);
    console.log('onMessage', data);
  }
}

export function* onNewUserConnected(
  channel: ActionPattern
): Generator<TakeEffect, any, { user: UserChat }> {
  while (true) {
    const { user } = yield take(channel);
    updateUserStatus(user, 'isActive', true);
  }
}

export function* onUserDisconnected(
  channel: ActionPattern
): Generator<TakeEffect, any, { user: UserChat }> {
  while (true) {
    const { user } = yield take(channel);
    updateUserStatus(user, 'isActive', false);
  }
}

export function* onConnectedUsers(
  channel: ActionPattern
): Generator<TakeEffect, any, UserChat[]> {
  while (true) {
    const users = yield take(channel);
    users.map((user) => {
      updateUserStatus(user, 'isActive', true);
    });
  }
}

export function* onTyping(
  channel: ActionPattern
): Generator<TakeEffect, any, UserChat> {
  while (true) {
    const data = yield take(channel);
    updateUserStatus(data, 'status', 'Typing');
  }
}

export function* onTypingStopped(
  channel: ActionPattern
): Generator<TakeEffect, any, UserChat> {
  while (true) {
    const data = yield take(channel);
    updateUserStatus(data, 'status', '');
  }
}

function updateUserStatus(user: UserChat, key: keyof UserChat, value: any) {
  let isUserFound = findUser(user.user_id);
  if (!isUserFound) {
    isUserFound = createUser(user);
  }
  updateUser(isUserFound, key, value);
}
