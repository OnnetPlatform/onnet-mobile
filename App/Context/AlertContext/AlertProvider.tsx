import { Alert } from '@Molecules';
import React, { ReactElement, useCallback, useState } from 'react';

import { AlertContext } from './AlertContext';
import { AlertStateTypes } from './types';

export const AlertProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertStateTypes>({ visible: false });

  const configureAlert = useCallback(
    (info: AlertStateTypes) => {
      setAlert(info);
    },
    [setAlert, alert]
  );

  return (
    <AlertContext.Provider value={{ ...alert, configureAlert }}>
      {children}
      <Alert />
    </AlertContext.Provider>
  );
};
