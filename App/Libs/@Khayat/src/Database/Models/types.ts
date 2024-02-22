import User from './User';

export type UserChat = {
  first_name: string;
  last_name: string;
  avatar: string;
  isActive: boolean;
  id: string;
  unreadCount: number;
  status: 'TYPING' | '';
  _id: string;
};

export type UploadedImage = {
  mimetype: string;
  filename: string;
  path: string;
  size: number;
  extension: string;
  fileSize: number;
  height: number;
  playableDuration: null | number;
  width: number;
};

export type Attachment = {
  gallery?: UploadedImage[] | undefined;
  voice?: string;
};

export type Message = {
  user: UserChat;
  attachment?: Attachment;
};

export type UserChatMessage = {
  sender: User;
  reciever: User;
  textMessage: string;
  createdAt: string;
};

export enum ModelEnums {
  USER = 'User',
  MESSAGE = 'Message',
}
