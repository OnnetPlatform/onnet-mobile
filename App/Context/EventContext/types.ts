import { Dispatch, SetStateAction } from 'react';

export type EventData = {
  title: string;
  description: string;
  date: number;
  duration: number;
};
export type EventContextType =
  | {
      event: EventData;
      setEventData: Dispatch<SetStateAction<EventData>>;
    }
  | undefined;
