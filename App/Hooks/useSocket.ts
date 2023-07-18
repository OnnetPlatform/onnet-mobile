import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { UserChat } from '../../types';
import ChatEvents from '../Services/ChatEvents/ChatEvents';
import { useQueue } from './useQueue';

const socketConfig = {
  transports: ['websocket'],
  autoConnect: true,
};
const defaulUser: UserChat = {
  name: '',
  avatar: '',
  isActive: false,
  id: '',
  unreadCount: 0,
  status: '',
};

export const useSocket = () => {
  const socket = useMemo<Socket>(() => io('http://192.168.1.5:80', socketConfig), []);
  const [currentUser, setCurrentUser] = useState<UserChat>(defaulUser);
  const { sendQueue } = useQueue();
  const [opponent, setOpponent] = useState<UserChat | undefined>();
  const [connected, setConnected] = useState<boolean>(false);
  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    socket.on('receive_dm', ChatEvents.notifyMessageListners);
    socket.on('user-typing', ChatEvents.notifyTypingListners);
    socket.on('user-stopped-typing', ChatEvents.notifyStoppedTypingListners);
    socket.on('disconnect', () => setConnected(false));

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (currentUser && sendQueue) {
      sendQueue();
    }
  }, [currentUser, sendQueue]);

  return { socket, currentUser, setOpponent, opponent, connected };
};
