import { createReducer, resettableReducer } from 'reduxsauce';
import SeamlessImmutable from 'seamless-immutable';
import { AuthTypes, EventActions } from '../../Actions';
import { EventState, EventStateObject } from './types';
import { Event } from '../../../Graphql/Events/types';
const initial_state = SeamlessImmutable<EventState>({
  events: [],
});

const setEvents = (state: EventStateObject, { events }: { events: Event[] }) =>
  state.merge({ ...state, events });

const handlers = {
  [EventActions.SET_EVENTS]: setEvents,
};
const reducer = createReducer(initial_state, handlers);
export default resettableReducer(AuthTypes.RESET, reducer);
