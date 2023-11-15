import { AnyAction } from 'redux';

export type MessagingActionTypes = {
  SET_CONNECTED: 'SET_CONNECTED';
  SEND_MESSAGE: 'SEND_MESSAGE';
  TYPING: 'TYPING';
  TYPING_STOPPED: 'TYPING_STOPPED';
};
export type MessagingCreatorTypes = {
  setConnected(isConnected: boolean): AnyAction;
  sendMessage(message: any): AnyAction;
  typing(user: any): AnyAction;
  typingStopped(user: any): AnyAction;
};
