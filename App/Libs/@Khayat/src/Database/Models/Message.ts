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
  read!: boolean;
  static schema = {
    name: 'Message',
    properties: {
      message: 'string',
      user: 'Profile',
      from: 'Profile',
      to: 'Profile',
      createdAt: 'string',
      read: 'bool?',
    },
  };
}

export default Message;
