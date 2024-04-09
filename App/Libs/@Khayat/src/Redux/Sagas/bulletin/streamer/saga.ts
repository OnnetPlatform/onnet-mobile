import { call, fork } from 'redux-saga/effects';
import { MediaStream, RTCPeerConnection } from 'react-native-webrtc';
import { createStreamerAnswerChannel } from './channels';
import { onNegotiationNeeded, onStreamerAnswer } from './events';
import { sendOffer } from './actions';
import { getLocalStream } from './utils';
import { createNegotiationChannel } from '../common/channels';
import { requestAuthorization } from '../common/utils';
import client from '../../../../Graphql/Client';
import { CREATE_BULLETIN_MUTATION } from '../../../../Graphql/Bulletin/Mutations/bulletin';

export function* stream(): any {
  const socket = yield call(requestAuthorization);
  const peerConnection = new RTCPeerConnection();
  const localStream: MediaStream = yield call(getLocalStream);
  localStream
    .getTracks()
    .map((track) => peerConnection.addTrack(track, localStream));
  const negotationSub = yield call(createNegotiationChannel, peerConnection);
  const streamAnswerSub = yield call(
    createStreamerAnswerChannel,
    socket,
    peerConnection
  );

  yield fork(onNegotiationNeeded, negotationSub);
  yield fork(onStreamerAnswer, streamAnswerSub);

  yield fork(sendOffer, socket);
}

export function* createBulletin({ title }: { title: string }): any {
  try {
    yield client.mutate({
      mutation: CREATE_BULLETIN_MUTATION,
      variables: { input: { title } },
      fetchPolicy: 'no-cache',
    });
  } catch (error) {}
}
