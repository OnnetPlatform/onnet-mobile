import { createActions } from 'reduxsauce';
import { MessagingActionTypes, MessagingCreatorTypes } from './types';

export const { Types: MessagingTypes, Creators: MessagingCreators } =
  createActions<MessagingActionTypes, MessagingCreatorTypes>({
    setConnected: ['isConnected'],
    sendMessage: ['message'],
    typing: ['user'],
    typingStopped: ['user'],
    setChatUpdating: ['isChatUpdating'],
  });
