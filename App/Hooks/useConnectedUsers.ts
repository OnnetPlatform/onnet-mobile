import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { UserChat, Message, UploadedImage } from '../../types';
import useChatEvents from './useChatEvents';
import { useRealmUsers } from '../Database/Hooks/useRealmUsers';
import { useRealm } from './useRealmContext';
import { useRealmMessages } from '../Database/Hooks/useRealmMessages';
import User from '../Database/Models/User';

export const useConnectedUsers = (socket: Socket) => {
  const [connectedUsers, setConnectedUsers] = useState<Map<string, UserChat>>(new Map());
  const { getUser, updateUser, createUser, users } = useRealmUsers();
  const realm = useRealm();
  const { createMessage } = useRealmMessages();
  const setConnectedUsersMap = (data: UserChat[]) => {
    data.map((connectedUser) => {
      const localUser = getUser(connectedUser);
      if (localUser) return updateUser(localUser, 'isActive', true);
      createUser(connectedUser);
    });
    users.map((localUser) => {
      updateUser(
        localUser,
        'isActive',
        data.find((user) => user.id === localUser.id) !== undefined
      );
    });
    const map = new Map(
      data.map((user) => {
        return [user.id, user];
      })
    );
    setConnectedUsers(map);
  };

  const onUserDiconnected = ({ user }: { user: UserChat }) => {
    const localUser = getUser(user);
    if (localUser) updateUser(localUser, 'isActive', false);
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
    const localUser = getUser(user);
    if (localUser) updateUser(localUser, 'isActive', true);
    setConnectedUsers((users) => {
      return new Map(
        users.set(user.id, {
          ...user,
          isActive: true,
        })
      );
    });
  };

  const onDirectMessage = (data: {
    attachment: { gallery?: UploadedImage[]; voice?: string };
    client: User;
    message: string;
    user: User;
  }) => {
    const localUser = getUser(data.user);
    const unreadCount = localUser ? localUser.unreadCount + 1 : 1;
    if (localUser) updateUser(localUser, 'unreadCount', unreadCount);
    else {
      createUser(data.user);
    }
    console.log(data.attachment.gallery);
    createMessage({
      user: data.user,
      messages: [{ message: data.message, attachment: data.attachment, date: '' }],
    });
    return setConnectedUsers((users) => {
      return new Map(
        users.set(data.user.id, {
          ...data.user,
          unreadCount,
        })
      );
    });
  };

  const onUserTyping = (data: { id: string }) => {
    const localUser = getUser({
      id: data.id,
      name: '',
      avatar: '',
      isActive: false,
      unreadCount: 0,
      status: '',
    });
    if (localUser && localUser?.status !== 'TYPING') updateUser(localUser, 'status', 'TYPING');
  };
  const onUserStoppedTyping = (data: { id: string }) => {
    const localUser = getUser({
      id: data.id,
      name: '',
      avatar: '',
      isActive: false,
      unreadCount: 0,
      status: '',
    });
    if (localUser && localUser?.status === 'TYPING') updateUser(localUser, 'status', '');
  };
  useEffect(() => {
    socket.on('connect', () => console.log('Connected'));
    socket.on('disconnect', () => console.log('disconnected'));
    socket.on('connected_users', setConnectedUsersMap);
    socket.on('user_connected', onUserConnected);
    socket.on('user_disconnected', onUserDiconnected);
  }, []);

  useChatEvents({ onDirectMessage, onUserStoppedTyping, onUserTyping }, []);

  return {
    connectedUsers,
    setConnectedUsers,
  };
};
