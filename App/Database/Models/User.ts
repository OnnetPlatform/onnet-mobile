import Realm from 'realm';
class User extends Realm.Object<User> {
  id!: Realm.BSON.ObjectId;
  name!: string;
  static schema = {
    name: 'User',
    properties: {
      id: 'objectId',
      name: 'string',
      avatar: 'string',
      isActive: 'bool',
      unreadCount: 'int',
    },
    primaryKey: '_id',
  };
}

export default User;
