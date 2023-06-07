import { Store } from '@khayat/onnet';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
export const OnnetProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const store = Store();
  return <Provider store={store}>{children}</Provider>;
};
