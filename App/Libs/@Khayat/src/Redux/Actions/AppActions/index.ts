import { createActions } from 'reduxsauce';
import { AppActionTypes, AppCreatorsType } from './types';

export const { Creators: AppCreators, Types: AppTypes } = createActions<
  AppActionTypes,
  AppCreatorsType
>(
  {
    startUp: null,
  },
  { prefix: '/app' }
);
