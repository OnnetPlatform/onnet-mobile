import React, { useContext } from 'react';
import { SnackbarContextType } from './types';

export const SnackbarContext = React.createContext<SnackbarContextType | null>(
  null
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error('SnackbarContext cannot be used outside SnackbarProvided');
  return context;
};
