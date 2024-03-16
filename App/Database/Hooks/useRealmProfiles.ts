import { useQuery } from '@Khayat/Database/Hooks/useRealmContext';
import { ProfileObject } from '@Khayat/Database/Models/types';
import { Profile } from '@Khayat/Database/Profile';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { UserSelector } from '@Khayat/Redux/Selectors/UserSelector';
import { useSelector } from 'react-redux';

export const useRealmProfiles = () => {
  const { id } = useSelector(AuthSelector);
  const {
    current_workspace: {
      workspace: { _id },
    },
  } = useSelector(UserSelector);
  const users = useQuery(Profile);

  const getUser = (user: Partial<ProfileObject>) =>
    users.find((local) => local.user === user.user);

  return {
    users: users
      .filtered(`workspace = "${_id}"`)
      .sorted('first_name')
      .sorted('active', true)
      .filtered(`user != "${id}"`),
    getUser,
  };
};
