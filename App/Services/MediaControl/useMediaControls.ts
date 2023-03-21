import CommsAPI from '@dolbyio/comms-sdk-react-native';
import { useState } from 'react';

type MediaStatus = {
  audio: boolean;
  video: boolean;
  speaker: boolean;
};
const useMediaControls = () => {
  const [mediaStatus, setMediaStatus] = useState<MediaStatus>({
    audio: false,
    video: false,
    speaker: false,
  });
  const startAudio = async () =>
    await CommsAPI.audio
      .getLocal()
      .start()
      .then(() => setMediaStatus({ ...mediaStatus, audio: true }))
      .catch(console.log);

  const stopAudio = async () =>
    await CommsAPI.audio
      .getLocal()
      .stop()
      .then(() => setMediaStatus({ ...mediaStatus, audio: false }))
      .catch(console.log);

  const startVideo = async () =>
    await CommsAPI.video
      .getLocal()
      .start()
      .then(() => setMediaStatus({ ...mediaStatus, video: true }))
      .catch(console.log);

  const stopVideo = async () =>
    await CommsAPI.video
      .getLocal()
      .stop()
      .then(() => setMediaStatus({ ...mediaStatus, video: false }))
      .catch(console.log);

  const switchCamera = async () =>
    await CommsAPI.mediaDevice.switchCamera().then(() => {
      setMediaStatus({ ...mediaStatus });
    });
  const switchSpeaker = async () => {
    await CommsAPI.mediaDevice.switchSpeaker().finally(console.log);
  };

  return {
    startAudio,
    stopAudio,
    startVideo,
    stopVideo,
    switchCamera,
    switchSpeaker,
    mediaStatus,
  };
};

export default useMediaControls;
