import { ImmutableObject } from 'seamless-immutable';
import { Event } from '../../../Graphql/Events/types';
export type Calendar = {
  day: number;
  month: number;
  year: number;
  title: string;
  data: Event[];
};
export type EventState = {
  events: Calendar[];
};
export type EventStateObject = ImmutableObject<EventState>;
