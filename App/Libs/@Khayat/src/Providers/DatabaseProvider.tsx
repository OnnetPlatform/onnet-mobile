// @ts-nocheck
import React, { PropsWithChildren } from 'react';
import { RealmProvider } from '../Database/Hooks/useRealmContext';
import { SCHEMA_VERSION } from '../Database/config';

export const DatabaseProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RealmProvider schemaVersion={SCHEMA_VERSION}>{children}</RealmProvider>
  );
};
export default RealmProvider;
