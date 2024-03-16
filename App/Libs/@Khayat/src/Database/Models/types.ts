import { Profile } from '../Profile';

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
  sender: Profile;
  reciever: Profile;
  textMessage: string;
  createdAt: string;
};

export enum ModelEnums {
  USER = 'User',
  MESSAGE = 'Message',
  PROFILE = 'Profile',
}

export type ProfileObject = {
  username?: string;
  avatar?: string;
  bio?: string;
  cover?: string;
  workspace?: string;
  user: string;
  active?: boolean;
  status?: string;
  title?: string;
  city?: string;
  country?: string;
  department?: string;
  phone?: string;
  last_name?: string;
  first_name?: string;
  full_name?: string;
};
