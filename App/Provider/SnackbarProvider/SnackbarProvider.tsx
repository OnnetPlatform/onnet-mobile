import { SnackbarContext } from '@Context/SnackbarContext';
import Snackbar from '@Molecules/Snackbar';
import { SnackbarProps } from '@Molecules/Snackbar/types';
import React, { PropsWithChildren, useState } from 'react';
import SnackbarRef from './SnackbarRef';

export const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [props, showSnackbar] = useState<SnackbarProps>();
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar ref={SnackbarRef} {...props} />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
