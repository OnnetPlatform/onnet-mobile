import { ImmutableObject } from 'seamless-immutable';

export type MessagingState = {
  isConnected: boolean;
  isChatUpdating: boolean;
};
export type MessagingReducerState = ImmutableObject<MessagingState>;
