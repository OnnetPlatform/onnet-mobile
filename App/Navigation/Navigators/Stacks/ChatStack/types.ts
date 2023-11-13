import { ReactElement } from 'react';

export type ChatStackParamList = {
  HomeChatScreen: undefined;
  UserChatScreen: undefined;
  ProfileScreen: undefined;
  Settings: undefined;
  CustomScreen: {
    title: string;
    content: ReactElement;
  };
};
