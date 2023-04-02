import { Message } from '../../../types';

type onMessageReceivedCallback = { (data: Message): void };
type onUserTypingCallback = { (data: Message): void };

export class ChatEvents {
  onMessageReceivedListners: onMessageReceivedCallback[] = [];
  onUserTypingListners: onMessageReceivedCallback[] = [];

  onMessageReceived = (callback: onMessageReceivedCallback) =>
    this.onMessageReceivedListners.push(callback);

  onUserTyping = (callback: onUserTypingCallback) => this.onUserTypingListners.push(callback);

  notifyMessageListners = (data: Message) =>
    this.onMessageReceivedListners.map((callback) => callback(data));

  notifyTypingListners = (data: Message) =>
    this.onUserTypingListners.map((callback) => callback(data));
}

export default new ChatEvents();
