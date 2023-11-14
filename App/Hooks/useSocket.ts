import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const { access_token } = useSelector(AuthSelector);

  const [currentUser] = useState<UserChat>(defaulUser);
  const { sendQueue } = useQueue();
  const [opponent, setOpponent] = useState<UserChat | undefined>();
  const [connected, setConnected] = useState<boolean>(false);
  const socket = useMemo<Socket>(
    () =>
      io('http://192.168.1.5:80', {
        ...socketConfig,
        query: {
          token: access_token,
        },
      }),
    [access_token]
  );
  useEffect(() => {
    if (access_token) {
      socket?.connect();
    }
  }, [socket, access_token]);

  useEffect(() => {
    socket?.on('receive_dm', ChatEvents.notifyMessageListners);
    socket?.on('user-typing', ChatEvents.notifyTypingListners);
    socket?.on('user-stopped-typing', ChatEvents.notifyStoppedTypingListners);
    socket?.on('disconnect', () => setConnected(false));

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (currentUser && sendQueue) {
      sendQueue();
    }
  }, [currentUser, sendQueue]);

  return { socket, currentUser, setOpponent, opponent, connected };
};
