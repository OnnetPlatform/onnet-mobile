import { Frame, VisionCameraProxy } from 'react-native-vision-camera';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('bulletinProcessor');

export function bulletinProcessor(frame: Frame): any {
  'worklet';
  if (plugin == null) {
    throw new Error(
      'Failed to load Frame Processor Plugin "bulletinProcessor"!'
    );
  }

  return plugin.call(frame);
}
