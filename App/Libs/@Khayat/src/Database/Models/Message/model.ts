import { Message } from './types';
import Realm from 'realm';

class MessageModel extends Realm.Object<Message> {
  _id!: string;
  textMessage!: string;
  static schema = {
    name: 'Message',
    properties: {
      textMessage: 'string',
      sender: 'User',
      reciever: 'User',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}

export default MessageModel;
