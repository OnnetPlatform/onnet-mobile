import { useMemo } from 'react';
import { faker } from '@faker-js/faker';

export const useFakerData = () => {
  const generateEventsData = () => ({
    title: faker.name.jobTitle(),
    date: faker.date.between(new Date().toString(), new Date().toString()),
    time: Math.round(Math.random() * 24),
    duration: 60,
  });

  const generateChatUsers = () => ({
    name: faker.name.fullName(),
    avatar: faker.image.avatar(),
    id: '123',
    isActive: true,
    unreadCount: 0,
  });

  const eventsData = useMemo(() => {
    const length = 100;
    const array = Array.from({ length }, generateEventsData);
    return array;
  }, []);

  const chatUsers = useMemo(() => Array.from({ length: 100 }, generateChatUsers), []);

  return {
    eventsData,
    chatUsers,
  };
};
