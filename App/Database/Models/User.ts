import Realm from 'realm';
import { UserChat } from '../../../types';
class User extends Realm.Object<User> {
  name!: string;
  avatar!: string;
  isActive!: boolean;
  unreadCount!: number;
  id!: string;
  static schema = {
    name: 'User',
    properties: {
      name: 'string',
      avatar: 'string',
      isActive: 'bool',
      unreadCount: 'int',
      id: 'string',
    },
  };
}

export default User;
