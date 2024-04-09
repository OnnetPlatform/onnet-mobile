import realmConfig from '../../config';
import { ModelEnums, UserChatMessage } from '../../Models/types';
import Realm from 'realm';
import { createUser, findUser } from '../User';
import Message from '../../Models/Message';

export const realm = new Realm(realmConfig);

export function createMessage(
  data: UserChatMessage
): Realm.Object<Message> | null {
  const { sender, reciever, textMessage } = data;
  if (!sender.user || !reciever.user) return null;
  let localUser = findUser(sender.user);
  let toLocalUser = findUser(reciever.user);

  if (!localUser) {
    localUser = createUser(sender);
  }

  if (!toLocalUser) {
    toLocalUser = createUser(reciever);
  }
  // @ts-ignore
  return realm.write(() => {
    return realm.create(ModelEnums.MESSAGE, {
      message: textMessage,
      user: localUser,
      from: localUser,
      to: toLocalUser,
      createdAt: data.createdAt,
      read: false,
    });
  });
}
export function createTextMessage() {}
