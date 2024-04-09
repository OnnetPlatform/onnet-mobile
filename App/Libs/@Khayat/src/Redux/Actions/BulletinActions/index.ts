import { createActions } from 'reduxsauce';
import { BulletinActionTypes, BulletinCreatorsTypes } from './types';

export const { Types: BulletinTypes, Creators: BulletinCreators } =
  createActions<BulletinActionTypes, BulletinCreatorsTypes>({
    setRemoteStream: ['remoteStream'],
    joinBulletin: null,
    stream: null,
    sendOffer: ['data'],
    sendViewerOffer: ['data'],
    createBulletin: ['title'],
  });
