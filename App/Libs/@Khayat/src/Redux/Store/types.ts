import { MessagingState } from '../Reducers/MessagingReducer/types';
import { AuthState } from '../Reducers/AuthReducer/types';

export type State = {
  AuthReducer: AuthState;
  MessagingReducer: MessagingState;
};
