import { eventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';
import { ConferenceEvents } from './types';
import { RTCPeerConnection } from 'react-native-webrtc';
export function* createConnectionChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = () => emit(true);
    socket.on(ConferenceEvents.CONNECTED, handler);
    return () => socket.disconnect();
  });
}
export function* createDiconnectionChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = () => emit(false);
    socket.on(ConferenceEvents.DISCONNECTED, handler);
    return () => socket.disconnect();
  });
}

export function* createOfferChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(ConferenceEvents.OFFER, handler);
    return () => socket.disconnect();
  });
}

export function* createAnswerChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(ConferenceEvents.ANSWER, handler);
    return () => socket.disconnect();
  });
}

export function* shouldOfferChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = () => emit(true);
    socket.on(ConferenceEvents.ESTABLISH_OFFER, handler);
    return () => socket.disconnect();
  });
}

export function* createJoinedUsersChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(ConferenceEvents.JOINED_USERS, handler);
    return () => socket.disconnect();
  });
}
export function* createIceCandidateChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(ConferenceEvents.CANDIDATE, handler);
    return () => socket.disconnect();
  });
}
// Peerconnections events

export function* createPCIceCandidateChannel(
  peerConnection: RTCPeerConnection,
  id: string
) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit({ ...data, id });
    peerConnection.onicecandidate = handler;
    return () => peerConnection.close();
  });
}
export function* createRemoteStreamChannel(
  peerConnection: RTCPeerConnection,
  id: string
) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit({ stream: data.streams[0], id });
    peerConnection.ontrack = handler;
    return () => peerConnection.close();
  });
}
