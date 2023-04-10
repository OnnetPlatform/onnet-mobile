import React, { ReactElement, useContext } from 'react';
import { MessageQueue, useQueue } from '../../Hooks/useQueue';

export const QueueContext = React.createContext<{
  queue: MessageQueue[];
  addToQueue(event: string, data: any, callback?: () => void): void;
  sendQueue(): void;
}>({
  queue: [],
  addToQueue: () => {
    console.log('addToQueue not initilized');
  },
  sendQueue: () => {
    console.log('sendQueue not initilized');
  },
});

export const useQueueContext = () => useContext(QueueContext);

export default ({ children }: { children: ReactElement[] }) => {
  const { queue, addToQueue, sendQueue } = useQueue();
  return (
    <QueueContext.Provider
      value={{
        addToQueue,
        sendQueue,
        queue,
      }}>
      {children}
    </QueueContext.Provider>
  );
};
