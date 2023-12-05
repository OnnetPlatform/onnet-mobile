import {
  mediaDevices,
  MediaStream,
  RTCPeerConnection,
} from 'react-native-webrtc';
import SocketIOClient from 'socket.io-client';

import { MEDIA_CONSTRAINTS, WEBRTC_SIGNALING_URL } from './config';

export const WebRTCServer = () =>
  SocketIOClient(WEBRTC_SIGNALING_URL, {
    transports: ['websocket'],
    autoConnect: true,
  });

export const createPeerConnection = () => new RTCPeerConnection(null);

export const getLocalStream = () =>
  new Promise<MediaStream>((resolve, reject) => {
    let isFront = true;
    mediaDevices.enumerateDevices().then((sourceInfos: any) => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          ...MEDIA_CONSTRAINTS,
          optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
        })
        .then(resolve)
        .catch(reject);
    });
  });
