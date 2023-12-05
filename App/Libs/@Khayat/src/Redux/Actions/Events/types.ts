import { AnyAction } from 'redux';
import { Event } from '../../../Graphql/Events/types';

export type EventActionTypes = {
  SET_EVENTS: any;
  GET_EVENTS: any;
};
export type EventCreatorTypes = {
  setEvents: (events: Event[]) => AnyAction;
  getEvents: () => AnyAction;
};
