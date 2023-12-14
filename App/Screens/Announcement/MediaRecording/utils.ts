import { Frame } from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { io } from 'socket.io-client';

import { bulletinProcessor } from '../../../Processors/bulettinProcessor';

export const socket = io('http://192.168.1.5:100', {
  transports: ['websocket'],
  autoConnect: true,
});
socket.connect();
export const frameProccessing = Worklets.createRunInJsFn((frame: Frame) => {
  const base64 = bulletinProcessor(frame);
  console.log(base64);
});
