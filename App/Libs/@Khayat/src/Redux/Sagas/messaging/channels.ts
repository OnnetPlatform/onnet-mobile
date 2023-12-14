import { eventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';
import { MessagingEvents } from './types';

export function createSocketConnectionChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = () => emit('connected');
    socket.on(MessagingEvents.CONNECT, handler);
    return () => socket.disconnect();
  });
}
export function createSocketDisconnectionChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = () => emit('disconnected');
    socket.on(MessagingEvents.DISCONNECT, handler);
    return () => socket.disconnect();
  });
}

export function createNewUserConnectedChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(MessagingEvents.USER_CONNECTED, handler);
    return () => socket.disconnect();
  });
}
export function createUserDisconnectedChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(MessagingEvents.USER_DICONNECTED, handler);
    return () => socket.disconnect();
  });
}
export function createConnectedUsersChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(MessagingEvents.CONNECTED_USERS, handler);
    return () => socket.disconnect();
  });
}

export function createDirectMessageChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(MessagingEvents.RECEIVE_MESSAGE, handler);
    return () => socket.disconnect();
  });
}

export function createTypingChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(MessagingEvents.TYPING, handler);
    return () => socket.disconnect();
  });
}

export function createTypingStoppedChannel(socket: Socket) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit(data);
    socket.on(MessagingEvents.STOPPED_TYPING, handler);
    return () => socket.disconnect();
  });
}
