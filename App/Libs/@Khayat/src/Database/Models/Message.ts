import Realm from 'realm';
import { Attachment, UserChat, UserChatMessage } from './types';

export class TextMessage extends Realm.Object {
  message!: string;
  attachment!: Attachment;
  date: string = new Date().toString();

  static schema = {
    name: 'TextMessage',
    properties: {
      message: 'string',
      attachment: 'Attachment',
      date: 'string',
    },
  };
}
class Message extends Realm.Object<UserChatMessage> {
  user!: UserChat;
  _id!: string;
  message: string = '';
  from!: UserChat;
  to!: UserChat;
  createdAt!: string;
  static schema = {
    name: 'Message',
    properties: {
      message: 'string',
      user: 'User',
      from: 'User',
      to: 'User',
      createdAt: 'string',
    },
  };
}

export default Message;
