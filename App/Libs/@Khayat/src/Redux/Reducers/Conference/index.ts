import { createReducer, resettableReducer } from 'reduxsauce';
import { MediaStream } from 'react-native-webrtc';
import { ConferenceTypes } from '../../Actions/Conference';
import { Stream } from '../../Actions/Conference/types';
import { ConferenceState } from './types';

const initial_state: ConferenceState = {
  localStream: null,
  remoteStreams: [],
  users: [],
  joined: false,
  connected: false,
};

const addRemoteStream = (
  state: ConferenceState,
  { stream }: { stream: Stream }
) => ({ ...state, remoteStreams: [...state.remoteStreams, stream] });

const setLocalStream = (
  state: ConferenceState,
  { stream }: { stream: MediaStream | null }
) => ({ ...state, localStream: stream });

const setJoined = (
  state: ConferenceState,
  { joined }: { joined: boolean }
) => ({ ...state, joined });

const setConnected = (
  state: ConferenceState,
  { connected }: { connected: boolean }
) => ({ ...state, connected });

const setUsers = (state: ConferenceState, { users }: { users: string[] }) => ({
  ...state,
  users,
});

const remoteStream = (state: ConferenceState, { id }: { id: string }) => ({
  ...state,
  remoteStreams: state.remoteStreams.filter((stream) => stream.id !== id),
});

const handlers = {
  [ConferenceTypes.ADD_REMOTE_STREAM]: addRemoteStream,
  [ConferenceTypes.SET_LOCAL_STREAM]: setLocalStream,
  [ConferenceTypes.SET_USERS]: setUsers,
  [ConferenceTypes.SET_JOINED]: setJoined,
  [ConferenceTypes.SET_CONNECTED]: setConnected,
  [ConferenceTypes.REMOVE_STREAM]: remoteStream,
};

const reducer = createReducer(initial_state, handlers);
export default resettableReducer(ConferenceTypes.DISCONNECT, reducer);
