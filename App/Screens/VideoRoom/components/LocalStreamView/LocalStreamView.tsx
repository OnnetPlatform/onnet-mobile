import React from 'react';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { View } from 'react-native';
import styles from './LocalStreamView.styles';
import { Text } from '../../../../Components/atoms';
export const LocalStreamView: React.FC<{ localStream: MediaStream | undefined }> = ({
  localStream,
}) => {
  if (!localStream)
    return (
      <View style={styles.stream}>
        <View style={styles.centerView}>
          <Text>Not initialized...</Text>
        </View>
      </View>
    );
  return <RTCView objectFit="cover" streamURL={localStream.toURL()} mirror style={styles.stream} />;
};
export default LocalStreamView;
