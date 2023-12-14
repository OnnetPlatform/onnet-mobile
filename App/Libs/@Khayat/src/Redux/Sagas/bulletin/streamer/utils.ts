import { MediaStream, mediaDevices } from 'react-native-webrtc';
import { MEDIA_CONSTRAINTS } from './config';

export const getLocalStream: () => Promise<MediaStream> = () =>
  new Promise((resolve, reject) => {
    mediaDevices.enumerateDevices().then((sourceInfos: any) => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind === 'videoinput' && sourceInfo.facing === 'user') {
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
