import { MessagingState } from '../Reducers/MessagingReducer/types';
import { AuthState } from '../Reducers/AuthReducer/types';
import { ConferenceState } from '../Reducers/Conference/types';
import { EventState } from '../Reducers/EventReducer/types';

export type State = {
  AuthReducer: AuthState;
  MessagingReducer: MessagingState;
  Conference: ConferenceState;
  Events: EventState;
};
