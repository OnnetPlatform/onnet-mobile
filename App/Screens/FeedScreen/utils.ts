import { useApolloClient } from '@apollo/client';
import { FEED_MUTATION } from '@Khayat/Graphql/Feed/Mutations/feed';
import { useState } from 'react';

export const useFeedData = () => {
  const [data, setData] = useState([]);

  const client = useApolloClient();
  const getData = async () => {
    const result = await client.mutate({
      mutation: FEED_MUTATION,
      fetchPolicy: 'network-only',
    });
    setData(result.data.feed);
  };
  return { data, getData };
};
