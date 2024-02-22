import { useQuery, useRealm } from '@Khayat/Database/Hooks/useRealmContext';
import { UserChat } from '@Khayat/Database/Models/types';
import User from '@Khayat/Database/Models/User';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useSelector } from 'react-redux';

export const useRealmUsers = () => {
  const { id } = useSelector(AuthSelector);
  const realm = useRealm();
  const users = useQuery(User);

  const deleteUser = (user: User) => realm.write(() => realm.delete(user));
  const createUser = () => {};
  const updateUser = () => {};
  const getUser = (user: Partial<UserChat>) =>
    users.find((local) => local._id === user._id);

  return {
    users: users
      .sorted('first_name')
      .sorted('isActive', true)
      .sorted('unreadCount', true)
      .filtered(`_id != "${id}"`),
    deleteUser,
    updateUser,
    createUser,
    getUser,
  };
};
