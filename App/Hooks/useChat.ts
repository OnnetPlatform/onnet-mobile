import { useEffect } from 'react';
import { UserChat, UserMessage } from '../../types';
import { useSocketContext } from '../Context/SocketContext/SocketContext';

export const useChat = () => {
  const { socket, connectedUsers, setConnectedUsers } = useSocketContext();

  const sendDirectMessage = (client: UserChat, message: string) =>
    socket.emit('send-dm', { client, message });

  const sendTypingEvent = (client: UserChat) => socket.emit('user-typing', { client });

  const sendStoppedTypingEvent = (client: UserChat) =>
    socket.emit('user-stopped-typing', { client });

  const onDirectMessage = (data: UserMessage) =>
    setConnectedUsers((users) => {
      return new Map(
        users.set(data.user.id, {
          ...data.user,
          unreadCount: data.user?.unreadCount + 1,
        })
      );
    });

  useEffect(() => {
    socket.on('receive_dm', onDirectMessage);
  }, [connectedUsers]);
  return { sendDirectMessage, sendTypingEvent, sendStoppedTypingEvent };
};
