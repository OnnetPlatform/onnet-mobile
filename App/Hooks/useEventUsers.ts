import { ProfileObject } from '@Khayat/Database/Models/types';
import client from '@Khayat/Graphql/Client';
import { GET_EVENT_INVITATIONS } from '@Khayat/Graphql/Events';
import { useCallback, useEffect, useState } from 'react';

export const useEventUsers = (event_id: string) => {
  const [users, setUsers] = useState<
    {
      Invitation: {
        createdAt: string;
        status: string;
      };
      user: ProfileObject;
    }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await client.query({
        query: GET_EVENT_INVITATIONS,
        variables: { input: { event_id } },
        fetchPolicy: 'no-cache',
      });
      setUsers(data.getEventInvitations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [event_id]);

  useEffect(() => {
    if (event_id !== null) fetchUsers();
  }, [event_id]);

  return { fetchUsers, users, loading };
};
