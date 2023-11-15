import { useMemo } from 'react';

import { Message } from '../../types';
import ChatEvents from '../Services/ChatEvents/ChatEvents';

export type ChatEvents = {
  onDirectMessage?(data: Message): void;
  onUserTyping?(data: { user_id: string }): void;
  onUserStoppedTyping?(data: { user_id: string }): void;
};

const useChatEvents = (
  { onDirectMessage, onUserTyping, onUserStoppedTyping }: ChatEvents,
  deps: any[]
) => {
  useMemo(() => {
    if (onDirectMessage) {
      ChatEvents.onMessageReceived(onDirectMessage);
    }
    if (onUserTyping) {
      ChatEvents.onUserTyping(onUserTyping);
    }
    if (onUserStoppedTyping) {
      ChatEvents.onUserStoppedTyping(onUserStoppedTyping);
    }
  }, deps);
};

export default useChatEvents;
