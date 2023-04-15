import { createRealmContext } from '@realm/react';
import realmConfig from '../Database';

export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);
