import {
  ActionPattern,
  TakeEffect,
  delay,
  put,
  take,
} from 'redux-saga/effects';
import { UserChat, UserChatMessage } from '../../../Database/Models/types';
import {
  createUser,
  findUser,
  reset,
  updateUser,
} from '../../../Database/Queries/User';
import { MessagingCreators } from '../../Actions/MessagingActions';
import { createMessage } from '../../../Database/Queries/Message';

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

export function* onMessage(
  channel: ActionPattern
): Generator<any, any, UserChatMessage> {
  while (true) {
    const data = yield take(channel);
    yield put(MessagingCreators.setChatUpdating(true));
    createMessage(data);
    yield delay(500);
    yield put(MessagingCreators.setChatUpdating(false));
  }
}

export function* onNewUserConnected(
  channel: ActionPattern
): Generator<TakeEffect, any, { user: UserChat }> {
  while (true) {
    const { user } = yield take(channel);
    updateUserStatus(user, 'isActive', true);
    updateUserStatus(user, 'avatar', user.avatar);
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
      updateUserStatus(user, 'avatar', user.avatar);
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
