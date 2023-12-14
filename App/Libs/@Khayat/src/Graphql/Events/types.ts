import { User } from '../Auth/types';

export type Event = {
  title: string;
  description: string;
  id: string;
  organizer: User;
  date: string;
  duration: number;
};
