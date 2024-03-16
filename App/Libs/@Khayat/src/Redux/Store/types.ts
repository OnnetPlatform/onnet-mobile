import { MessagingState } from '../Reducers/MessagingReducer/types';
import { AuthState } from '../Reducers/AuthReducer/types';
import { ConferenceState } from '../Reducers/Conference/types';
import { EventState } from '../Reducers/EventReducer/types';
import { BulletinState } from '../Reducers/BulletinReducer/types';
import { UserReducerType } from '../Reducers/UserReducer/types';

export type State = {
  AuthReducer: AuthState;
  MessagingReducer: MessagingState;
  Conference: ConferenceState;
  Events: EventState;
  Bulletin: BulletinState;
  UserReducer: UserReducerType;
};
