import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { UserChat } from '../../../types';

export type SocketContextType = {
  connectedUsers: Map<string, UserChat>;
  socket: Socket;
  currentUser: UserChat;
  opponent: UserChat | undefined;
  setConnectedUsers: Dispatch<SetStateAction<Map<string, UserChat>>>;
  setOpponent: Dispatch<SetStateAction<UserChat | undefined>>;
  connected: boolean;
};
