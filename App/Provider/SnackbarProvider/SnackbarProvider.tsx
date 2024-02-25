import { SnackbarContext } from '@Context/SnackbarContext';
import Snackbar from '@Molecules/Snackbar';
import { SnackbarProps } from '@Molecules/Snackbar/types';
import React, { PropsWithChildren, useState } from 'react';

export const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [props, showSnackbar] = useState<SnackbarProps>();
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {props ? <Snackbar {...props} /> : null}
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
