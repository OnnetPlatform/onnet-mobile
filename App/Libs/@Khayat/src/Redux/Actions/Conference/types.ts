import { MediaStream } from 'react-native-webrtc';
import { Action } from 'redux';
import { RTCSessionDescription } from 'react-native-webrtc';
export type Stream = {
  id: string;
  stream: MediaStream;
};
export type ConferenceActionTypes = {
  SET_CONNECTED: any;
  SET_JOINED: any;
  DISCONNECT: string;
  ADD_REMOTE_STREAM: any;
  CONNECT: any;
  SET_LOCAL_STREAM: any;
  SEND_OFFER: any;
  SEND_ANSWER: any;
  SEND_CANDIDATE: any;
  SET_USERS: any;
  JOIN: any;
  REMOVE_STREAM: any;
};

export type ConferenceCreatorTypes = {
  removeStream(id: string): Action;
  join(): void;
  addRemoteStream(data: Stream): Action;
  setLocalStream(stream: MediaStream | null): Action;
  disconnect(): Action;
  connect(): void;
  sendCandidate(candidate: {
    id: string;
    candidate: { label: string; candidate: string; id: string };
  }): Action;
  sendOffer(offer: { id: string; offer: RTCSessionDescription }): Action;
  sendAnswer(offer: { id: string; answer: RTCSessionDescription }): Action;
  setUsers(users: string[]): Action;
  setJoined(joined: boolean): Action;
  setConnected(connected: boolean): Action;
  join(): Action;
};
