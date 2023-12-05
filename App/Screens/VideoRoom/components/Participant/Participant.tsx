import { useColors } from '@Theme';
import { ThemeColors } from '@Theme/Colors';
import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';

import { useThemedStyle } from './Participant.styles';

export const Participant: React.FC<{
  stream: MediaStream;
}> = ({ stream }) => {
  const colors = useColors();
  const styles = useThemedStyle(colors);

  useEffect(() => {
    stream.getTracks().map((track) => {
      track.addEventListener('muted', () => {
        console.log('muted');
      });
    });
  }, [stream]);

  return (
    <View style={styles.wrapper}>
      <RTCView
        objectFit="cover"
        streamURL={stream.toURL()}
        style={styles.container}
        mirror
      />
    </View>
  );
};

export default memo(Participant, (prev, next) => {
  return prev.stream._id === next.stream._id;
});
