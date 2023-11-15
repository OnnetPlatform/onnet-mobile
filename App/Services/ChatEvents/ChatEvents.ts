import { Message } from '../../../types';

type onMessageReceivedCallback = { (data: Message): void };
type onTypingCallback = { (data: { user_id: string }): void };

export class ChatEvents {
  onMessageReceivedListners: onMessageReceivedCallback[] = [];
  onUserTypingListners: onTypingCallback[] = [];
  onUserStoppedTypingListners: onTypingCallback[] = [];

  onMessageReceived = (callback: onMessageReceivedCallback) =>
    this.onMessageReceivedListners.push(callback);

  onUserTyping = (callback: onTypingCallback) =>
    this.onUserTypingListners.push(callback);

  onUserStoppedTyping = (callback: onTypingCallback) =>
    this.onUserStoppedTypingListners.push(callback);

  notifyMessageListners = (data: Message) =>
    this.onMessageReceivedListners.map((callback) => callback(data));

  notifyTypingListners = (data: { user_id: string }) =>
    this.onUserTypingListners.map((callback) => callback(data));

  notifyStoppedTypingListners = (data: { user_id: string }) =>
    this.onUserStoppedTypingListners.map((callback) => callback(data));
}

export default new ChatEvents();
