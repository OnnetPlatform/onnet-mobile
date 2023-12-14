// @ts-nocheck
import realmConfig from '../../config';
import { ModelEnums, UserChatMessage } from '../../Models/types';
import Realm from 'realm';
import { createUser, findUser } from '../User';
import Message from '../../Models/Message';

export const realm = new Realm(realmConfig);

export function createMessage(data: UserChatMessage): Realm.Object<Message> {
  const { user, message, to } = data;
  let localUser = findUser(user.user_id);
  let toLocalUser = findUser(to.user_id);

  if (!localUser) {
    localUser = createUser(user);
  }

  if (!toLocalUser) {
    toLocalUser = createUser(to);
  }

  return realm.write(() => {
    localUser.unreadCount++;
    return realm.create(ModelEnums.MESSAGE, {
      message,
      user: localUser,
      from: localUser,
      to: toLocalUser,
    });
  });
}
export function createTextMessage() {}
