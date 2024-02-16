import { io } from 'socket.io-client';

export const requestAuthorization = () => {
  const socket = io('http://192.168.1.5:100', {
    transports: ['websocket'],
    autoConnect: true,
  });
  return new Promise((resolve) => resolve(socket));
};
