import realmConfig from '../../config';
import { ModelEnums, UserChatMessage } from '../../Models/types';
import Realm from 'realm';
import { createUser, findUser } from '../User';
import Message from '../../Models/Message';

export const realm = new Realm(realmConfig);

export function createMessage(data: UserChatMessage): Realm.Object<Message> {
  const { sender, reciever, textMessage } = data;
  let localUser = findUser(sender._id);
  let toLocalUser = findUser(reciever._id);

  if (!localUser) {
    localUser = createUser(sender);
  }

  if (!toLocalUser) {
    toLocalUser = createUser(reciever);
  }
  // @ts-ignore
  return realm.write(() => {
    localUser.unreadCount++;
    return realm.create(ModelEnums.MESSAGE, {
      message: textMessage,
      user: localUser,
      from: localUser,
      to: toLocalUser,
      createdAt: data.createdAt,
    });
  });
}
export function createTextMessage() {}
