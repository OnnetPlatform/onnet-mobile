import { AnyAction } from 'redux';
import { Event } from '../../../Graphql/Events/types';
import { EventData } from '../../Sagas/events/types';

export type EventActionTypes = {
  SET_EVENTS: any;
  CREATE_EVENT: any;
  GET_EVENTS: any;
};
export type EventCreatorTypes = {
  setEvents: (events: Event[]) => AnyAction;
  getEvents: () => AnyAction;
  createEvent: (data: EventData) => AnyAction;
};
