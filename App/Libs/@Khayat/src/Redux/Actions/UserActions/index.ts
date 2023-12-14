import { createActions } from 'reduxsauce';
import type { UserActionTypes, UserCreatorsTypes } from './types';

export const { Types: UserTypes, Creators: UserCreators } = createActions<
  UserActionTypes,
  UserCreatorsTypes
>(
  {
    getCurrentUser: null,
  },
  { prefix: '/User' }
);
