import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export const APP_LINK = createHttpLink({
  uri: 'http://192.168.1.5:4000/graphql',
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link: APP_LINK,
  cache: new InMemoryCache(),
});
export default client;
