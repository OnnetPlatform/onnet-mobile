export type UserChat = {
  name: string;
  avatar: string;
  isActive: boolean;
  id: string;
  unreadCount: number;
};

export type UserMessage = {
  message: string;
  user: UserChat;
};
