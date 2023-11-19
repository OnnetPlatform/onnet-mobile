export enum MessagingEvents {
  CONNECT = 'connect',
  MESSAGE = 'send-dm',
  RECEIVE_MESSAGE = 'receive_dm',
  READY = 'ready',
  JOIN_ROOM = 'joinRoom',
  TYPING = 'user-typing',
  STOPPED_TYPING = 'user-stopped-typing',
  USER_CONNECTED = 'user_connected',
  USER_DICONNECTED = 'user_disconnected',
  CONNECTED_USERS = 'connected_users',
  DISCONNECT = 'disconnect',
  SEND_MESSAGE = 'send-dm',
}
