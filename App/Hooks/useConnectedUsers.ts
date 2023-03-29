import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { UserChat, UserMessage } from '../../types';
import { useChat } from './useChat';
import useChatEvents from './useChatEvents';

export const useConnectedUsers = (socket: Socket) => {
  const [connectedUsers, setConnectedUsers] = useState<Map<string, UserChat>>(new Map());
  const setConnectedUsersMap = (data: UserChat[]) => {
    const map = new Map(
      data.map((user) => {
        return [user.id, user];
      })
    );
    setConnectedUsers(map);
  };

  const onUserDiconnected = ({ user }: { user: UserChat }) => {
    setConnectedUsers((users) => {
      return new Map(
        users.set(user.id, {
          ...user,
          isActive: false,
        })
      );
    });
  };

  const onUserConnected = ({ user }: { user: UserChat }) => {
    setConnectedUsers((users) => {
      return new Map(
        users.set(user.id, {
          ...user,
          isActive: true,
        })
      );
    });
  };
  const onDirectMessage = (data: UserMessage) => {
    return setConnectedUsers((users) => {
      const localUser = users.get(data.user.id);
      const unreadCount = localUser ? localUser.unreadCount + 1 : 1;
      return new Map(
        users.set(data.user.id, {
          ...data.user,
          unreadCount,
        })
      );
    });
  };
  useChatEvents({ onDirectMessage });

  useEffect(() => {
    socket.on('connect', () => console.log('Connected'));
    socket.on('disconnect', () => console.log('disconnected'));
    socket.on('connected_users', setConnectedUsersMap);
    socket.on('user_connected', onUserConnected);
    socket.on('user_disconnected', onUserDiconnected);
  }, []);

  return {
    connectedUsers,
    setConnectedUsers,
  };
};
