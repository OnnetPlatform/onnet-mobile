import { RTCPeerConnection } from 'react-native-webrtc';
import { eventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';

export function* createStreamAddedChannel(peer: RTCPeerConnection) {
  return eventChannel((emit) => {
    // @ts-ignore
    peer.ontrack = (e) => {
      console.log(e);
      emit({ stream: e.streams[0], peer });
    };
    return () => {
      peer.close();
    };
  });
}
export function* createStreamOfferChannel(
  socket: Socket,
  peer: RTCPeerConnection
) {
  return eventChannel((emit) => {
    const handler = (data: any) => emit({ data, peer });
    socket.on('send_viewer_offer', handler);
    return () => {
      socket.disconnect();
    };
  });
}
