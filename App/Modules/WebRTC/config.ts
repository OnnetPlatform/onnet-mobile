import { Dimensions } from 'react-native';

let isFront = true;

const { width, height } = Dimensions.get('window');
export const ICE_SERVERS = [
  {
    urls: 'stun:stun.l.google.com:19302',
  },
  {
    urls: 'stun:stun1.l.google.com:19302',
  },
  {
    urls: 'stun:stun2.l.google.com:19302',
  },
];

export const WEBRTC_SIGNALING_URL = 'http://192.168.1.5:90';

export const MEDIA_CONSTRAINTS = {
  audio: true,
  video: {
    mandatory: {
      height: height,
      width: width,
      minFrameRate: 30,
      frameRate: 60,
    },
    facingMode: isFront ? 'user' : 'environment',
  },
};
