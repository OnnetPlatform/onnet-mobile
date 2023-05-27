import { useCallback, useEffect, useState } from 'react';
import { useSocketContext } from '../Context/SocketContext/SocketContext';
export type MessageQueue = {
  data: any;
  event: string;
  callback?(): void;
  id: number;
  sent?: boolean;
};
export const useQueue = () => {
  const { socket } = useSocketContext();
  const [queue, setQueue] = useState<Map<number, MessageQueue>>(new Map());

  const addToQueue = (event: string, data: any, callback?: () => void) => {
    setQueue((q) => {
      return new Map(
        q.set(q.size + 1, {
          event,
          data,
          callback,
          id: q.size + 1,
        })
      );
    });
  };

  const sendQueue = useCallback(() => {
    queue.forEach((item) => {
      socket.emit(item.event.toString(), item.data, () => {
        queue.delete(item.id);
      });
      if (item.callback) item.callback();
    });
  }, [socket, queue]);

  useEffect(() => {
    if (socket && socket.active) sendQueue();
  }, [queue, socket]);

  return { queue, addToQueue, sendQueue };
};
