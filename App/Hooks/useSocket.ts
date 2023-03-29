import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { UserChat } from '../../types';
import ChatEvents from '../Services/ChatEvents/ChatEvents';

const socketConfig = {
  transports: ['websocket'],
  autoConnect: true,
};

export const useSocket = () => {
  const socket = useMemo<Socket>(() => io('http://192.168.1.5:80', socketConfig), []);
  const [currentUser, setCurrentUser] = useState<UserChat>({
    name: '',
    avatar: '',
    isActive: false,
    id: '',
    unreadCount: 0,
  });
  useEffect(() => {
    socket.connect();
    socket.on('ready', ({ user }) => setCurrentUser(user));
    socket.on('receive_dm', ChatEvents.notifyMessageListners);
    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket, currentUser };
};
