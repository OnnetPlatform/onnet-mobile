import {
  ActionPattern,
  CallEffect,
  ForkEffect,
  PutEffect,
  SelectEffect,
  SimpleEffect,
  TakeEffect,
  call,
  fork,
  put,
  select,
  take,
} from 'redux-saga/effects';
import { ConferenceCreators } from '../../Actions';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  MediaStreamTrack,
  MediaStream,
} from 'react-native-webrtc';
import { ConferenceSelector } from '../../Selectors/ConferenceSelector';
import { ConferenceState } from '../../Reducers/Conference/types';
import {
  createPCIceCandidateChannel,
  createRemoteStreamChannel,
} from './channels';

const peerConnections: { [key: string]: RTCPeerConnection } = {};

export function* onConnected(
  channel: ActionPattern
): Generator<PutEffect | CallEffect | TakeEffect, any, any> {
  while (true) {
    yield take(channel);
    yield put(ConferenceCreators.setConnected(true));
  }
}

export function* onDisconnected(
  channel: ActionPattern
): Generator<PutEffect | TakeEffect | SelectEffect, any, any> {
  while (true) {
    yield take(channel);
    const { localStream } = yield select(ConferenceSelector);
    Object.keys(peerConnections).map((id) => {
      peerConnections[id].close();
      delete peerConnections[id];
    });
    localStream.release();
    yield put(ConferenceCreators.setLocalStream(null));
    yield put(ConferenceCreators.setJoined(false));
    yield put(ConferenceCreators.disconnect());
  }
}

export function* onJoinedUsers(
  channel: ActionPattern
): Generator<
  SelectEffect | TakeEffect | CallEffect | ForkEffect | PutEffect,
  SimpleEffect<ConferenceState>,
  ConferenceState & string[] & MediaStream
> {
  while (true) {
    const users: string[] = yield take(channel);
    yield put(ConferenceCreators.setUsers(users));
    const { localStream } = yield select(ConferenceSelector);
    const ids = Object.keys(peerConnections);

    for (let index = 0; index < ids.length; index++) {
      const id = ids[index];
      const isFound = users.find((item) => item === id) !== undefined;
      if (!isFound) {
        peerConnections[id].close();
        delete peerConnections[id];
        yield put(ConferenceCreators.removeStream(id));
      }
    }

    for (let index = 0; index < users.length; index++) {
      const id = users[index];
      if (!peerConnections[id] && localStream) {
        peerConnections[id] = new RTCPeerConnection();

        localStream?.getAudioTracks().map((track: MediaStreamTrack) => {
          track.enabled = false;
        });

        localStream
          ?.getTracks()
          .map((track) => peerConnections[id].addTrack(track, localStream));
        console.log('CREATING PEER CONNECTION::');

        const candidateCSub = yield call(
          createPCIceCandidateChannel,
          peerConnections[id],
          id
        );

        const remoteStreamSub = yield call(
          createRemoteStreamChannel,
          peerConnections[id],
          id
        );

        yield fork(onPCICCandidate, candidateCSub);
        yield fork(onRemoteStream, remoteStreamSub);
      }
    }
  }
}

export function* onAnswer(channel: ActionPattern): Generator<any, any, any> {
  while (true) {
    const { id, answer } = yield take(channel);
    console.log('SOCKET::ANSWER', id);
    try {
      yield peerConnections[id].setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export function* onOffer(channel: ActionPattern): Generator<any, any, any> {
  while (true) {
    const { id, offer } = yield take(channel);
    console.log('SOCKET::OFFER', id);
    yield peerConnections[id].setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = yield peerConnections[id].createAnswer();
    yield peerConnections[id].setLocalDescription(answer);
    console.log('SOCKET::OFFER DONE', id);

    yield put(ConferenceCreators.sendAnswer({ id, answer }));
  }
}

export function* onCandidate(channel: ActionPattern): Generator<any, any, any> {
  while (true) {
    const { id, candidate } = yield take(channel);
    console.log('SOCKET::CANDIDATE', id);
    const iceCandidate = new RTCIceCandidate({
      candidate: candidate.candidate,
      sdpMid: candidate.id,
      sdpMLineIndex: candidate.label,
    });
    yield peerConnections[id].addIceCandidate(iceCandidate);
  }
}

export function* onPCICCandidate(
  channel: ActionPattern
): Generator<any, any, any> {
  while (true) {
    const { candidate, id } = yield take(channel);
    console.log('WEBRTC::CANDIDATE', id);

    if (candidate)
      yield put(
        ConferenceCreators.sendCandidate({
          id,
          candidate: {
            label: candidate.sdpMLineIndex,
            id: candidate.sdpMid,
            candidate: candidate.candidate,
          },
        })
      );
  }
}

export function* onShouldOffer(
  channel: ActionPattern
): Generator<any, any, any> {
  while (true) {
    const data = yield take(channel);
    console.log('SOCKET::ESTABLISH OFFER');

    const ids = Object.keys(peerConnections);
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index];
      const pc = peerConnections[id];
      const offer = yield pc.createOffer({
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true,
          VoiceActivityDetection: true,
        },
      });
      yield pc.setLocalDescription(offer);
      console.log(id);
      yield put(ConferenceCreators.sendOffer({ id, offer }));
    }
    console.log('onShouldOffer', data);
  }
}

function* onRemoteStream(channel: ActionPattern): Generator<any, any, any> {
  const data = yield take(channel);
  yield put(ConferenceCreators.addRemoteStream(data));
}
