import { RTCPeerConnection } from 'react-native-webrtc';
import { eventChannel } from 'redux-saga';

export function* createNegotiationChannel(peer: RTCPeerConnection) {
  return eventChannel((emit) => {
    const handler = () => emit(peer);
    // @ts-ignore
    peer.onnegotiationneeded = () => {
      handler();
    };

    return () => {
      peer.close();
    };
  });
}
