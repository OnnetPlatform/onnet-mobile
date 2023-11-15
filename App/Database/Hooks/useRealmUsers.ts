// @ts-nocheck
import { useQuery, useRealm } from '@Khayat/Database/Hooks/useRealmContext';
import { UserChat } from '@Khayat/Database/Models/types';
import User from '@Khayat/Database/Models/User';

export const useRealmUsers = () => {
  const realm = useRealm();
  const users = useQuery(User);

  const deleteUser = (user: User) => realm.write(() => realm.delete(user));
  const createUser = () => {};
  const updateUser = () => {};
  const getUser = (user: UserChat) => {
    const localUser = users.find((local) => local.user_id === user.user_id);
    return localUser;
  };

  return {
    users: users
      .sorted('name')
      .sorted('isActive', true)
      .sorted('unreadCount', true),
    deleteUser,
    updateUser,
    createUser,
    getUser,
  };
};
