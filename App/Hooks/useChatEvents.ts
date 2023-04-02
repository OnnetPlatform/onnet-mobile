import { useMemo } from 'react';
import { Message } from '../../types';
import ChatEvents from '../Services/ChatEvents/ChatEvents';

export type ChatEvents = {
  onDirectMessage?(data: Message): void;
  onUserTyping?(): void;
};

const useChatEvents = ({ onDirectMessage, onUserTyping }: ChatEvents) => {
  useMemo(() => {
    console.log(ChatEvents.onMessageReceived.length);
    if (onDirectMessage) ChatEvents.onMessageReceived(onDirectMessage);
    if (onUserTyping) ChatEvents.onUserTyping(onUserTyping);
  }, []);
};

export default useChatEvents;
