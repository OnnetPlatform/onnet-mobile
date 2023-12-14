// @ts-nocheck
import { ApolloProvider } from '@apollo/client';
import React, { ReactElement } from 'react';
import client from '.';

type Prop = { children: ReactElement };

export const OnnetApolloProvider: React.FC<Prop> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
