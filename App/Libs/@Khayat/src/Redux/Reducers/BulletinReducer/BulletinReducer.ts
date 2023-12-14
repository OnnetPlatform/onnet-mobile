import { BulletinTypes } from '../../Actions/BulletinActions';
import { MediaStream } from 'react-native-webrtc';
import { BulletinState } from './types';
import { createReducer } from 'reduxsauce';

const initial_state: BulletinState = {
  remoteStream: null,
};

const setRemoteStream = (
  state: BulletinState,
  { remoteStream }: { remoteStream: MediaStream }
) => ({
  ...state,
  remoteStream,
});

const handlers = {
  [BulletinTypes.SET_REMOTE_STREAM]: setRemoteStream,
};

export default createReducer(initial_state, handlers);
