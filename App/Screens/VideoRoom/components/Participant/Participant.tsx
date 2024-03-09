import { useColors } from '@Theme';
import React, { memo } from 'react';
import { View } from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';

import { useThemedStyle } from './Participant.styles';

export const Participant: React.FC<{
  stream: MediaStream;
}> = ({ stream }) => {
  const colors = useColors();
  const styles = useThemedStyle(colors);

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
