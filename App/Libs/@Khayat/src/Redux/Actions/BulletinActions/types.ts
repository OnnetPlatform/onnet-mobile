import { MediaStream } from 'react-native-webrtc';
import { AnyAction } from 'redux';

export type BulletinActionTypes = {
  SET_REMOTE_STREAM: any;
  STREAM: any;
  JOIN_BULLETIN: any;
  SEND_OFFER: any;
  SEND_VIEWER_OFFER: any;
};

export type BulletinCreatorsTypes = {
  sendOffer(offer: any): any;
  setRemoteStream: (remoteStream: MediaStream | null) => AnyAction;
  joinBulletin: () => AnyAction;
  stream: () => AnyAction;
  sendViewerOffer: (data: any) => AnyAction;
};
