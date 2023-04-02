import { UserChat } from '../../types';
import { useSocketContext } from '../Context/SocketContext/SocketContext';

export const useChat = (client?: UserChat) => {
  const { socket } = useSocketContext();
  const sendDirectMessage = (data: any, callback?: () => void) =>
    socket.emit('send-dm', { client, ...data }, callback);

  const sendTypingEvent = () => socket.emit('user-typing', { client });

  const sendStoppedTypingEvent = () => socket.emit('user-stopped-typing', { client });

  return { sendDirectMessage, sendTypingEvent, sendStoppedTypingEvent };
};
