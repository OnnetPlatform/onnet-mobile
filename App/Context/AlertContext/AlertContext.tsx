import React, { useContext } from 'react';

import { AlertContextTypes } from './types';

export const AlertContext = React.createContext<AlertContextTypes>(undefined);

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw Error('AlertConext must be used withing AlertProvider');
  }
  return context;
};

export default useAlert;
