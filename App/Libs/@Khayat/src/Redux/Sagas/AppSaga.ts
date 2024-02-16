import { ApolloLink, concat } from '@apollo/client';
import { AuthSelector } from '../../Redux/Selectors/AuthSelector';
import { SelectEffect, select } from 'redux-saga/effects';
import client, { APP_LINK } from '../../Graphql/Client';

export function* startUp(): Generator<
  SelectEffect,
  any,
  { access_token: string }
> {
  console.log('ONNET:SAGAS', 'STARTED');
  const { access_token } = yield select(AuthSelector);
  setAppLink(access_token);
}

export const setAppLink = (token: string) => {
  const middleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
    return forward(operation);
  });
  client.setLink(concat(middleware, APP_LINK));
};
