import { ProfileObject } from '../../Database/Models/types';

export type Event = {
  title: string;
  description: string;
  id: string;
  organizer: ProfileObject;
  date: string;
  duration: number;
};
