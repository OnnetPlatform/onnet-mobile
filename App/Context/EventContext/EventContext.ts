import React, { useContext } from 'react';

import { EventContextType } from './types';

export const EventContext = React.createContext<EventContextType>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('EventContext must be used within EventProvider');
  }
  return context;
};
