import 'react-native-get-random-values';

import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import RNCallKeep from 'react-native-callkeep';
import { MediaStream, MediaStreamTrack } from 'react-native-webrtc';
import { v4 as uuidv4 } from 'uuid';

import { getLocalStream, WebRTCServer } from '../../Modules/WebRTC';
import { WebrtcContextType } from './types';

const WebrtcContext = React.createContext<WebrtcContextType>(undefined);

const WebrtcProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [connected, setConnected] = useState<boolean>(false);
  const socket = useMemo(() => WebRTCServer(), []);
  const callid = useMemo(() => uuidv4(), []);
  const disableTrack = (track: MediaStreamTrack) => {
    track.enabled = false;
  };

  const connect = () => {
    socket.connect();
  };
  const join = useCallback(() => {
    getLocalStream()
      .then((stream) => {
        stream.getVideoTracks().map(disableTrack);
        stream.getAudioTracks().map(disableTrack);
        setLocalStream(stream);
      })
      .then(() => socket.emit('join'));
  }, []);

  const leave = useCallback(() => {
    if (localStream && socket) {
      localStream.release();
      socket.disconnect();
      setLocalStream(undefined);
      setConnected(false);
      RNCallKeep.endAllCalls();
    }
  }, [localStream]);

  useEffect(() => {
    socket.on('connected', () => setConnected(true));
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <WebrtcContext.Provider
      value={{
        localStream,
        socket,
        join,
        leave,
        connected,
        callid,
        connect,
      }}>
      {children}
    </WebrtcContext.Provider>
  );
};
export const useWebrtcContext = () => {
  const context = useContext(WebrtcContext);
  if (!context) {
    throw new Error('should be used inside WebrtcProvider');
  }
  return context;
};

export default WebrtcProvider;
