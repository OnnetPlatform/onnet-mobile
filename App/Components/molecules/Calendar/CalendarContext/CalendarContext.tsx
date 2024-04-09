import React, { useContext, useEffect, useState } from 'react';

import Calendar from '../Calendar';
import { CalendarContextType } from './types';

export const CalendarContext =
  React.createContext<CalendarContextType>(undefined);

export const CalendarProvider: React.FC<{
  width: number;
  onDateChange: (date: Date) => void;
}> = ({ width, onDateChange }) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    onDateChange(date);
  }, [date]);

  return (
    <CalendarContext.Provider value={{ date, setDate }}>
      <Calendar width={width} />
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('must be used within CalendarProvider');
  }
  return context;
};
