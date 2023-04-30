import Realm from 'realm';
import { UserChat } from '../../../types';
class User extends Realm.Object<User> {
  name!: string;
  avatar!: string;
  isActive!: boolean;
  unreadCount!: number;
  id!: string;
  status: 'TYPING' | '' = '';
  static schema = {
    name: 'User',
    properties: {
      name: 'string',
      avatar: 'string',
      isActive: 'bool',
      unreadCount: 'int',
      id: 'string',
      status: 'string',
    },
  };
}

export default User;
