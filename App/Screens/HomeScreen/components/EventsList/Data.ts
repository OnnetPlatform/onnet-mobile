import { useMemo } from 'react';
import { faker } from '@faker-js/faker';

export const useFakerData = () => {
  const generateEventsData = () => ({
    title: faker.name.jobTitle(),
    date: faker.date.between('2023-03-21T00:00:00.000Z', '2023-07-21T00:00:00.000Z'),
    time: Math.round(Math.random() * 24),
    duration: 60,
  });

  const eventsData = useMemo(() => {
    const length = 100;
    const array = Array.from({ length }, generateEventsData);
    return array;
  }, []);

  return {
    eventsData,
  };
};
