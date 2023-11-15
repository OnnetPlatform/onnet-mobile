import { ImmutableObject } from 'seamless-immutable';

export type MessagingState = {
  isConnected: boolean;
};
export type MessagingReducerState = ImmutableObject<MessagingState>;
