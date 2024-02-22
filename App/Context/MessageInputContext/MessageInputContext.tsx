import React, { useContext } from 'react';
import { MessageInputContext as MessageInputContextTypes } from './types';

export const MessageInputContext =
  React.createContext<MessageInputContextTypes>(undefined);

export const useMessageInputContext = () => {
  const context = useContext(MessageInputContext);
  if (!context)
    throw new Error(
      'Cannot use MessageInputContext ouside MessageInputProvider'
    );
  return context;
};
