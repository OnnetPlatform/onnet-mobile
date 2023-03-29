import { UserChat, UserMessage } from '../../types';
import { useSocketContext } from '../Context/SocketContext/SocketContext';
import useChatEvents from './useChatEvents';

export const useChat = (client?: UserChat) => {
  const { socket, setConnectedUsers } = useSocketContext();
  const sendDirectMessage = (message: string, callback?: () => void) =>
    socket.emit('send-dm', { client, message }, callback);

  const sendTypingEvent = () => socket.emit('user-typing', { client });

  const sendStoppedTypingEvent = () => socket.emit('user-stopped-typing', { client });

  return { sendDirectMessage, sendTypingEvent, sendStoppedTypingEvent };
};
