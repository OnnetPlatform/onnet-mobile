import { RTCPeerConnection } from 'react-native-webrtc';
import { eventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';

export function* createStreamerAnswerChannel(
  socket: Socket,
  peer: RTCPeerConnection
) {
  return eventChannel((emit) => {
    socket.on('streamer-answer', (data) => emit({ data, peer }));
    return () => {
      socket.close();
    };
  });
}
