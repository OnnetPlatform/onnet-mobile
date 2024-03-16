import realmConfig from '../../../Database/config';
import { ModelEnums } from '../../../Database/Models/types';
import Realm from 'realm';
import { Profile } from '../../Profile';

export const realm = new Realm(realmConfig);

export function createUser(user: any): any {
  return realm.write(() => {
    return realm.create(ModelEnums.PROFILE, {
      ...user,
      active: true,
    });
  });
}
export function findUser(user_id: string): Profile {
  const user = realm
    .objects<Profile>(ModelEnums.PROFILE)
    .filtered(`user = "${user_id}"`)[0];
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
  realm.objects<Profile>(ModelEnums.PROFILE).map((model) => {
    realm.write(() => {
      model.active = false;
      model.status = '';
    });
  });
}
