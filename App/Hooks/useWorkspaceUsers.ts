import { ProfileObject } from '@Khayat/Database/Models/types';
import client from '@Khayat/Graphql/Client';
import { GET_WORKSPACE_USERS } from '@Khayat/Graphql/User/Queries/getWorkspaceUsers';
import { UserSelector } from '@Khayat/Redux/Selectors/UserSelector';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useWorkspaceUsers = () => {
  const { current_workspace } = useSelector(UserSelector);
  const [users, setUsers] = useState<ProfileObject[]>([]);

  const fetchUsers = useCallback(async () => {
    const { data } = await client.query({
      query: GET_WORKSPACE_USERS,
      fetchPolicy: 'no-cache',
    });
    setUsers(data.getWorkspaceUsers);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [current_workspace]);

  return { fetchUsers, users };
};
