import { UserChat } from '../../types';
import { useQueueContext } from '../Context/QueueContext/QueueContext';

export const useChat = (client?: UserChat) => {
  const { addToQueue } = useQueueContext();

  const sendDirectMessage = (data: any, callback?: () => void) =>
    addToQueue('send-dm', { client, ...data }, callback);

  const sendTypingEvent = () => addToQueue('user-typing', { client });

  const sendStoppedTypingEvent = () => addToQueue('user-stopped-typing', { client });

  return { sendDirectMessage, sendTypingEvent, sendStoppedTypingEvent };
};
