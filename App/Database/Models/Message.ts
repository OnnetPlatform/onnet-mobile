import Realm from 'realm';
import { Attachment, UserChat } from '../../../types';
import { UserChatMessage } from '../../Screens/UserChatScreen/types';

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
  messages: TextMessage[] = [];
  static schema = {
    name: 'Message',
    properties: {
      messages: { type: 'list', objectType: 'TextMessage' },
      user: 'User',
    },
  };
}

export default Message;
