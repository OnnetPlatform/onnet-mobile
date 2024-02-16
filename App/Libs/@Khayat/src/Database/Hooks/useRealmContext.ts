import { createRealmContext } from '@realm/react';
import realmConfig from '../config';

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);
