import { Dispatch, SetStateAction } from 'react';

export type CalendarContextType =
  | {
      date: Date;
      setDate: Dispatch<SetStateAction<Date>>;
    }
  | undefined;
