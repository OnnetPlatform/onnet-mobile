import { Attachment, Message } from '../../../types';

export type UserChatMessage = Exclude<Message, 'message' | 'attachment'> & {
  messages: {
    message: string;
    attachment: Attachment | undefined;
  }[];
};
