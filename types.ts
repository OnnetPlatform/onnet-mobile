export type UserChat = {
  name: string;
  avatar: string;
  isActive: boolean;
  id: string;
  unreadCount: number;
  status: 'TYPING' | '';
  user_id: string;
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
