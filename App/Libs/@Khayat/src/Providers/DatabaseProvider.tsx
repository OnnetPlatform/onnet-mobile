// @ts-nocheck
import React, { PropsWithChildren } from 'react';
import { RealmProvider } from '../Database/Hooks/useRealmContext';
import { SCHEMA_VERSION } from '../Database/config';
import { AppProvider } from '@realm/react';

export const DatabaseProvider: React.FC<
  PropsWithChildren<{ id: string; baseUrl: string }>
> = ({ children, ...config }) => {
  return (
    <AppProvider {...config}>
      <RealmProvider schemaVersion={SCHEMA_VERSION}>{children}</RealmProvider>
    </AppProvider>
  );
};
export default DatabaseProvider;
