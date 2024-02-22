import Realm from 'realm';

class User extends Realm.Object<User> {
  first_name!: string;
  last_name!: string;
  avatar!: string;
  isActive!: boolean;
  unreadCount: number = 0;
  _id!: string;
  status: 'TYPING' | '' = '';
  static schema = {
    name: 'User',
    properties: {
      first_name: 'string',
      last_name: 'string',
      avatar: 'string',
      isActive: 'bool',
      unreadCount: 'int',
      status: 'string',
      _id: 'string',
    },
  };
}

export default User;
