import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '192.168.1.5:4000',
  cache: new InMemoryCache(),
});
export default client;
