import { useEffect, useState } from 'react';
import { useWebrtcContext } from '../../../../Context/WebrtcContext';
import { MediaStreamTrack } from 'react-native-webrtc';
import RNCallKeep from 'react-native-callkeep';

export const useMediaControl = () => {
  const { localStream } = useWebrtcContext();
  const { callid } = useWebrtcContext();
  const [mediaStatus, setMediaStatus] = useState({
    audio: false,
    video: false,
    speaker: false,
  });
  const enableTrack = (track: MediaStreamTrack) => (track.enabled = true);
  const disableTrack = (track: MediaStreamTrack) => (track.enabled = false);
  const mute = () => {
    localStream?.getAudioTracks().map(disableTrack);
    setMediaStatus({ ...mediaStatus, audio: false });
  };
  const unmute = () => {
    localStream?.getAudioTracks().map(enableTrack);
    setMediaStatus({ ...mediaStatus, audio: true });
  };
  const enableCamera = () => {
    localStream?.getVideoTracks().map(enableTrack);
    setMediaStatus({ ...mediaStatus, video: true });
  };
  const disableCamera = () => {
    localStream?.getVideoTracks().map(disableTrack);
    setMediaStatus({ ...mediaStatus, video: false });
    switchCamera();
    switchCamera();
  };

  const updateCall = (videoEanbled: boolean) => {
    RNCallKeep.updateDisplay(callid, 'Meeting name', 'Onnet', {
      ios: {
        hasVideo: videoEanbled,
      },
    });
  };

  const switchCamera = () => {
    localStream?.getVideoTracks().map((track) => {
      track._switchCamera();
    });
  };

  useEffect(() => {
    updateCall(mediaStatus.video);
  }, [mediaStatus, mediaStatus.video]);

  useEffect(() => {
    RNCallKeep.startCall(callid, 'Onnet', 'Meeting name', 'number', true);
  }, [callid]);

  return {
    mediaStatus,
    mute,
    unmute,
    enableCamera,
    disableCamera,
    switchCamera,
  };
};
