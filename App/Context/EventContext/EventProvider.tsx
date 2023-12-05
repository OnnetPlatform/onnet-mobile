import { initial_event_data } from '@Screens/CreateEvent/EventInfoScreen/types';
import React, { ReactElement, useState } from 'react';

import { EventContext } from './EventContext';
import { EventData } from './types';

export const EventProivder: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [event, setEventData] = useState<EventData>(initial_event_data);

  return (
    <EventContext.Provider value={{ event, setEventData }}>
      {children}
    </EventContext.Provider>
  );
};
