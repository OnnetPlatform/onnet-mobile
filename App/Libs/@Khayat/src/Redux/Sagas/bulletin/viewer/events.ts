import { MediaStream, RTCSessionDescription } from 'react-native-webrtc';
import { BulletinCreators } from '../../../Actions/BulletinActions';
import { ActionPattern, put, take } from 'redux-saga/effects';

export function* onNegotiationNeeded(channel: ActionPattern): any {
  while (true) {
    const peer = yield take(channel);
    const offer = yield peer.createOffer({});
    yield peer.setLocalDescription(offer);
    yield put(BulletinCreators.sendViewerOffer(offer));
  }
}

export function* onStreamAdded(channel: ActionPattern): any {
  while (true) {
    const { stream } = yield take(channel);
    const remote = new MediaStream(stream);
    try {
      yield put(BulletinCreators.setRemoteStream(remote));
    } catch (error) {
      console.log('error', error);
    }
  }
}
export function* onStreamOffer(channel: ActionPattern): any {
  while (true) {
    const { data, peer } = yield take(channel);
    const desc = new RTCSessionDescription(data.sdp);
    try {
      yield peer.setRemoteDescription(desc);
    } catch (error) {
      console.log(error);
    }
  }
}
