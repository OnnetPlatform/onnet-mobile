import { OnnetApolloProvider } from '@Khayat/Graphql/Client/Provider';
import { Store } from '@Khayat/Redux';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

export const OnnetProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const store = Store();

  return (
    <Provider store={store}>
      <OnnetApolloProvider>{children}</OnnetApolloProvider>
    </Provider>
  );
};
