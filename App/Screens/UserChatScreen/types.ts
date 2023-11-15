import { Attachment } from '../../../types';
import User from '../../Database/Models/User';

export type UserChatMessage = {
  user: User;
  messages: {
    message: string;
    attachment: Attachment | undefined;
    date: string;
  }[];
};
