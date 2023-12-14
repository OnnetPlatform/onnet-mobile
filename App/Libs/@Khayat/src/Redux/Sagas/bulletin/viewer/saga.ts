import { createNegotiationChannel } from '../common/channels';
import { RTCPeerConnection } from 'react-native-webrtc';
import { call, fork } from 'redux-saga/effects';
import { onNegotiationNeeded, onStreamAdded, onStreamOffer } from './events';
import { createStreamAddedChannel, createStreamOfferChannel } from './channels';
import { requestAuthorization } from '../common/utils';
import { sendOffer } from './actions';

export function* joinBulletin(): any {
  const socket = yield call(requestAuthorization);
  const peerConnection = new RTCPeerConnection();
  peerConnection.addTransceiver('video', { direction: 'recvonly' });
  const negotationSub = yield call(createNegotiationChannel, peerConnection);
  const streamSub = yield call(createStreamAddedChannel, peerConnection);
  const offerSub = yield call(createStreamOfferChannel, socket, peerConnection);

  yield fork(onNegotiationNeeded, negotationSub);
  yield fork(onStreamAdded, streamSub);
  yield fork(onStreamOffer, offerSub);
  yield fork(sendOffer, socket);
}
