import SeamlessImmutable from 'seamless-immutable';
import { MessagingReducerState, MessagingState } from './types';
import { MessagingTypes } from '../../Actions/MessagingActions';
import { createReducer } from 'reduxsauce';

const initial_state = SeamlessImmutable<MessagingState>({
  isConnected: false,
});

const setConnceted = (
  state: MessagingReducerState,
  { isConnected }: MessagingState
) => state.merge({ isConnected });

const handlers = {
  [MessagingTypes.SET_CONNECTED]: setConnceted,
};
export default createReducer(initial_state, handlers);
