import { MediaStream } from 'react-native-webrtc';
import { Socket } from 'socket.io-client';

export type WebrtcContextType =
  | undefined
  | {
      localStream: MediaStream | undefined;
      socket: Socket;
      join: () => void;
      leave: () => void;
      connect: () => void;
      connected: boolean;
      callid: string;
    };
