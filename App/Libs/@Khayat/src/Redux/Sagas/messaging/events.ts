import {
  ActionPattern,
  TakeEffect,
  delay,
  put,
  take,
} from 'redux-saga/effects';
import { ProfileObject, UserChatMessage } from '../../../Database/Models/types';
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
    console.log('data', data);
    yield put(MessagingCreators.setChatUpdating(true));
    try {
      createMessage(data);
    } catch (error) {
      console.log(error);
    }
    yield delay(502);
    yield put(MessagingCreators.setChatUpdating(false));
  }
}

export function* onNewUserConnected(
  channel: ActionPattern
): Generator<TakeEffect, any, { user: ProfileObject }> {
  while (true) {
    try {
      const { user } = yield take(channel);
      updateUserStatus(user);
    } catch (error) {
      console.log(error);
    }
  }
}

export function* onUserDisconnected(
  channel: ActionPattern
): Generator<TakeEffect, any, { user: ProfileObject }> {
  while (true) {
    const { user } = yield take(channel);
    updateUserStatus({ ...user, active: false });
  }
}

export function* onConnectedUsers(
  channel: ActionPattern
): Generator<TakeEffect, any, ProfileObject[]> {
  while (true) {
    const users = yield take(channel);
    users.map((user) => {
      updateUserStatus({ ...user });
    });
  }
}

export function* onTyping(
  channel: ActionPattern
): Generator<TakeEffect, any, ProfileObject> {
  while (true) {
    const data = yield take(channel);
    updateUserStatus({ ...data, typing: true });
  }
}

export function* onTypingStopped(
  channel: ActionPattern
): Generator<TakeEffect, any, ProfileObject> {
  while (true) {
    const data = yield take(channel);
    updateUserStatus({ ...data, typing: false });
  }
}

function updateUserStatus(user: ProfileObject) {
  let isUserFound = findUser(user.user);
  if (!isUserFound) {
    isUserFound = createUser(user);
  }
  updateUser(isUserFound, user);
}
