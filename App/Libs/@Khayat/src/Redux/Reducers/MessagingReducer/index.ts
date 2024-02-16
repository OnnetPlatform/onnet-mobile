import SeamlessImmutable from 'seamless-immutable';
import { MessagingReducerState, MessagingState } from './types';
import { MessagingTypes } from '../../Actions/MessagingActions';
import { createReducer } from 'reduxsauce';

const initial_state = SeamlessImmutable<MessagingState>({
  isConnected: false,
  isChatUpdating: false,
});

const setConnceted = (
  state: MessagingReducerState,
  { isConnected }: MessagingState
) => state.merge({ isConnected });

const setChatUpdating = (
  state: MessagingReducerState,
  { isChatUpdating }: Exclude<MessagingState, 'isConnected'>
) => state.merge({ isChatUpdating });

const handlers = {
  [MessagingTypes.SET_CONNECTED]: setConnceted,
  [MessagingTypes.SET_CHAT_UPDATING]: setChatUpdating,
};
export default createReducer(initial_state, handlers);
