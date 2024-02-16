import { MediaStream } from 'react-native-webrtc';
import { Stream } from '../../Actions/Conference/types';

export type ConferenceState = {
  localStream: MediaStream | null;
  remoteStreams: Stream[];
  users: any[];
  joined: boolean;
  connected: boolean;
};

export type ConferenceStateType = ConferenceState;
