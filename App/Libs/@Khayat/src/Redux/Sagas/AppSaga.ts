import { ApolloLink, concat } from '@apollo/client';
import { AuthSelector } from '../../Redux/Selectors/AuthSelector';
import { SelectEffect, select } from 'redux-saga/effects';
import client, { APP_LINK } from '../../Graphql/Client';
import { UserSelector } from '../Selectors/UserSelector';
import { UserReducerType } from '../Reducers/UserReducer/types';

export function* startUp(): Generator<
  SelectEffect,
  any,
  { access_token: string } & UserReducerType
> {
  console.log('ONNET:SAGAS', 'STARTED');
  const { access_token } = yield select(AuthSelector);
  const { current_workspace } = yield select(UserSelector);
  setAppLink(access_token, current_workspace.workspace_access_token);
}

export const setAppLink = (token: string, workspace_access_token: string) => {
  const middleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        workspace_access_token,
      },
    });
    return forward(operation);
  });
  client.setLink(concat(middleware, APP_LINK));
};
