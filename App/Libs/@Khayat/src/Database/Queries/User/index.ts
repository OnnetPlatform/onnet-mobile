import User from 'src/Database/Models/User';
import realmConfig from '../../../Database/config';
import { ModelEnums, UserChat } from '../../../Database/Models/types';
import Realm from 'realm';

export const realm = new Realm(realmConfig);

export function createUser(user: UserChat): User {
  return realm.write(() => {
    return realm.create(ModelEnums.USER, { ...user, status: '' });
  });
}
export function findUser(user_id: string): User {
  const user = realm
    .objects<User>(ModelEnums.USER)
    .filtered(`user_id = "${user_id}"`)[0];
  return user;
}
export function updateUser(
  user: Realm.Object<User>,
  key: keyof User,
  value: any
) {
  realm.write(() => {
    // @ts-ignore
    user[key] = value;
  });
}
export function deleteUser() {}
export function reset() {
  realm.objects<User>(ModelEnums.USER).map((model) => {
    realm.write(() => {
      model.isActive = false;
      model.status = '';
    });
  });
}
