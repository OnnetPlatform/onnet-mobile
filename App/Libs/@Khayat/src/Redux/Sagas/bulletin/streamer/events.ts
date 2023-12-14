import { ActionPattern, put, take } from 'redux-saga/effects';
import { RTCSessionDescription } from 'react-native-webrtc';
import { BulletinCreators } from '../../../Actions/BulletinActions';

export function* onNegotiationNeeded(channel: ActionPattern): any {
  while (true) {
    const peer = yield take(channel);
    const offer = yield peer.createOffer({});
    yield peer.setLocalDescription(offer);
    yield put(BulletinCreators.sendOffer(peer.localDescription));
  }
}

export function* onStreamerAnswer(channel: ActionPattern): any {
  while (true) {
    const { data, peer } = yield take(channel);
    const desc = new RTCSessionDescription(data.sdp);
    try {
      yield peer.setRemoteDescription(desc);
    } catch (error) {}
  }
}
