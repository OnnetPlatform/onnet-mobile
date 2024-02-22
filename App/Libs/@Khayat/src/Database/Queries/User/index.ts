import realmConfig from '../../../Database/config';
import { ModelEnums } from '../../../Database/Models/types';
import Realm from 'realm';
import User from '../../Models/User';

export const realm = new Realm(realmConfig);

export function createUser(user: any): any {
  return realm.write(() => {
    return realm.create(ModelEnums.USER, {
      ...user,
      status: '',
      isActive: true,
      unreadCount: 0,
    });
  });
}
export function findUser(user_id: string): User {
  const user = realm
    .objects<User>(ModelEnums.USER)
    .filtered(`_id = "${user_id}"`)[0];
  return user;
}
export function updateUser(user: any, newData: any) {
  Object.keys(user).map((item: any) => {
    realm.write(() => {
      if (newData[item] !== undefined && user[item] !== newData[item])
        user[item] = newData[item];
    });
  });
}
export function reset() {
  realm.objects<User>(ModelEnums.USER).map((model) => {
    realm.write(() => {
      model.isActive = false;
      model.status = '';
    });
  });
}
