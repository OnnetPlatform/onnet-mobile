import { useCallback, useEffect, useState } from 'react';
import { useSocketContext } from '../Context/SocketContext/SocketContext';
export type MessageQueue = {
  data: any;
  event: string;
  callback?(): void;
  id?: number;
  sent?: boolean;
};
export const useQueue = () => {
  const { socket } = useSocketContext();
  const [queue, setQueue] = useState<MessageQueue[]>([]);

  const addToQueue = (event: string, data: any, callback?: () => void) => {
    setQueue((q) => [...q, { data, event, id: q.length + 1, sent: false, callback }]);
  };

  const sendQueue = useCallback(() => {
    console.log('Queue started');
    queue.map((item) => {
      if (!item.sent) {
        console.log;
        socket.emit(item.event.toString(), item.data, () => {
          item.sent = true;
        });
        if (item.callback) item.callback();
      }
    });
  }, [socket, queue]);

  useEffect(() => {
    if (socket && socket.active) sendQueue();
  }, [queue, socket]);

  return { queue, addToQueue, sendQueue };
};
