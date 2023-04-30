import { UserChat } from '../../../types';
import { useQuery, useRealm } from '../../Hooks/useRealmContext';
import User from '../Models/User';

export const useRealmUsers = () => {
  const realm = useRealm();
  const users = useQuery(User);

  const deleteUser = (user: User) => realm.write(() => realm.delete(user));
  const createUser = (dto: UserChat) =>
    realm.write(() => realm.create('User', { ...dto, status: '' }));
  const updateUser = (user: User, key: keyof UserChat, value: any) =>
    //@ts-ignore
    realm.write(() => (user[key] = value));

  const getUser = (user: UserChat) => {
    const localUser = users.find((local) => local.id === user.id);
    return localUser;
  };

  return {
    users: users.sorted('name').sorted('isActive', true).sorted('unreadCount', true),
    deleteUser,
    updateUser,
    createUser,
    getUser,
  };
};
