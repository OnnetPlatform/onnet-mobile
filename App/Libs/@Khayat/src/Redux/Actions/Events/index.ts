import { createActions } from 'reduxsauce';
import { EventActionTypes, EventCreatorTypes } from './types';
export const { Types: EventActions, Creators: EventCreators } = createActions<
  EventActionTypes,
  EventCreatorTypes
>({
  getEvents: null,
  setEvents: ['events'],
  createEvent: ['data'],
});
