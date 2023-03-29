import { UserMessage } from '../../../types';

type onMessageReceivedCallback = { (data: UserMessage): void };
type onUserTypingCallback = { (data: UserMessage): void };

export class ChatEvents {
  onMessageReceivedListners: onMessageReceivedCallback[] = [];
  onUserTypingListners: onMessageReceivedCallback[] = [];

  onMessageReceived = (callback: onMessageReceivedCallback) =>
    this.onMessageReceivedListners.push(callback);

  onUserTyping = (callback: onUserTypingCallback) => this.onUserTypingListners.push(callback);

  notifyMessageListners = (data: UserMessage) =>
    this.onMessageReceivedListners.map((callback) => callback(data));

  notifyTypingListners = (data: UserMessage) =>
    this.onUserTypingListners.map((callback) => callback(data));
}

export default new ChatEvents();
