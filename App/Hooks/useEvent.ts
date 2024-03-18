import { useSnackbar } from '@Context/SnackbarContext';
import client from '@Khayat/Graphql/Client';
import {
  GET_EVENT_BY_ID_QUERY,
  UPDATE_EVENT_BY_ID_MUTATION,
} from '@Khayat/Graphql/Events';
import { Event } from '@Khayat/Graphql/Events/types';
import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

export const useEvent = (id?: string) => {
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const apollo = useApolloClient();
  const { showSnackbar } = useSnackbar();
  const fetchEvent = useCallback(async () => {
    setLoading(true);
    console.log(id);
    try {
      const { data } = await client.query({
        query: GET_EVENT_BY_ID_QUERY,
        variables: { id: id },
        fetchPolicy: 'no-cache',
      });
      if (data.event === null) {
        showSnackbar({ title: 'Error', subtitle: 'Event not found' });
        return navigation.goBack();
      }
      setEvent(data.event);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);

  const updateEvent = useCallback(async (data: Partial<Event>) => {
    setLoading(true);

    try {
      await apollo.mutate({
        mutation: UPDATE_EVENT_BY_ID_MUTATION,
        variables: { input: data },
        fetchPolicy: 'no-cache',
      });
      showSnackbar({
        title: 'Success!',
        subtitle: 'Event updated successfully',
      });
      fetchEvent();
    } catch (error) {
      showSnackbar({
        title: 'Error!',
        subtitle: 'Something went wrong',
        variant: 'ERROR',
      });
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

  return { event, fetchEvent, updateEvent, loading };
};
