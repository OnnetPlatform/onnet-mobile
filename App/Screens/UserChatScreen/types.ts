import User from '../../Database/Models/User';

export type UserChatMessage = {
  user: User;
  message: string;
};
