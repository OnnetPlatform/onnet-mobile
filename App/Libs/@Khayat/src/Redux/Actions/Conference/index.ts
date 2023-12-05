import { createActions } from 'reduxsauce';
import { ConferenceActionTypes, ConferenceCreatorTypes } from './types';

export const { Types: ConferenceTypes, Creators: ConferenceCreators } =
  createActions<ConferenceActionTypes, ConferenceCreatorTypes>(
    {
      join: null,
      addRemoteStream: ['stream'],
      setLocalStream: ['stream'],
      disconnect: null,
      connect: null,
      sendOffer: ['data'],
      sendAnswer: ['data'],
      sendCandidate: ['data'],
      setUsers: ['users'],
      setJoined: ['joined'],
      setConnected: ['connected'],
      removeStream: ['id'],
    },
    { prefix: '/webrtc' }
  );
