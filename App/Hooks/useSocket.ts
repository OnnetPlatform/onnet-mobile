import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { UserChat } from '../../types';
import ChatEvents from '../Services/ChatEvents/ChatEvents';
import { useQueue } from './useQueue';
import { useSocketContext } from '../Context/SocketContext/SocketContext';

const socketConfig = {
  transports: ['websocket'],
  autoConnect: true,
};
const defaulUser = {
  name: '',
  avatar: '',
  isActive: false,
  id: '',
  unreadCount: 0,
};

export const useSocket = () => {
  const socket = useMemo<Socket>(() => io('http://192.168.1.5:80', socketConfig), []);
  const [currentUser, setCurrentUser] = useState<UserChat>(defaulUser);
  const { sendQueue } = useQueue();
  const [opponent, setOpponent] = useState<UserChat | undefined>();

  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    socket.on('ready', ({ user }) => {
      setCurrentUser(user);
    });
    socket.on('receive_dm', ChatEvents.notifyMessageListners);
    socket.on('user-typing', ChatEvents.notifyTypingListners);
    socket.on('user-stopped-typing', ChatEvents.notifyStoppedTypingListners);
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (currentUser && sendQueue) {
      sendQueue();
    }
  }, [currentUser, sendQueue]);

  return { socket, currentUser, setOpponent, opponent };
};
