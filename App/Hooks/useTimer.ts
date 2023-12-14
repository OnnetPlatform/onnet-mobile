import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

export const useTimer = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [milliseconds, setMilliSeconds] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  let intervalId: any = null;

  function formatTimer(millisecond: number) {
    const duration = moment.duration(-millisecond);
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const formattedTimer = moment({ hours, minutes, seconds }).format(
      hours > 0 ? 'HH:mm:ss' : 'mm:ss'
    );
    return formattedTimer;
  }

  const interval = () => {
    if (!paused && startDate) {
      setMilliSeconds(moment(startDate).diff(moment(), 'milliseconds'));
    }
  };

  const start = useCallback(async () => {
    setStartDate(new Date());
    return () => {
      setStartDate(null);
    };
  }, [paused]);

  const resume = useCallback(() => {
    intervalId = setInterval(interval, 1000);
    setPaused(false);

    return () => {
      clearInterval(intervalId);
    };
  }, [startDate, paused]);

  const pause = () => {
    setPaused(true);
  };

  const reset = () => {
    setStartDate(null);
  };

  useEffect(() => {
    setStartDate(null);
  }, []);

  useEffect(() => {
    if (startDate) {
      resume();
    }
    return () => {
      clearInterval(intervalId);
      setMilliSeconds(0);
    };
  }, [startDate]);

  return {
    start,
    pause,
    reset,
    resume,
    startDate,
    timer: formatTimer(milliseconds),
  };
};
