import { VideoView } from '@dolbyio/comms-sdk-react-native';
import { Participant } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon, Text } from '../../../../Components/atoms';
import useStyle from './ConferenceVideo.styles';

export const ConferenceVideo: React.FC<{
  id: string;
  participant: Participant;
  localParticipant: Participant | undefined;
  index: number;
}> = ({ participant, id, localParticipant, index }) => {
  const styles = useStyle(index);
  const animatedWidth = useSharedValue(0);
  const setRef = async (element: any) => {
    if (element) {
      try {
        participant.streams?.map(async (stream) => {
          await element.attach(participant, stream);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTracks = () => {
    const tracks = participant.streams?.map((s) => {
      const { audioTracks, videoTracks } = s;
      return {
        isMuted: audioTracks.length === 0,
        isCameraOn: videoTracks.length > 0,
        isLocal: participant.id === localParticipant?.id,
      };
    });

    return tracks && tracks.length > 0
      ? tracks[0]
      : { isMuted: true, isCameraOn: false, isLocal: false };
  };
  const status = getTracks();

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedWidth.value,
  }));

  useEffect(() => {
    animatedWidth.value = withTiming(status.isCameraOn ? 300 : 0);
  }, [status.isCameraOn]);
  return (
    <View style={styles.videoWrapper}>
      <Animated.View style={animatedStyle}>
        <VideoView isMirror={true} style={styles.video} scaleType={'fill'} key={id} ref={setRef} />
      </Animated.View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.row}>
          <View>
            <Image
              style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2 }}
              source={{ uri: participant.info.avatarUrl }}
            />
            <View
              style={{
                backgroundColor: participant.status === 'LEFT' ? 'red' : 'green',
                width: 12,
                height: 12,
                borderRadius: 12,
                bottom: 4,
                right: 0,
                position: 'absolute',
              }}
            />
          </View>
          <Text weight={'bold'} style={{ marginLeft: 8, textTransform: 'uppercase' }}>
            {index === 0 ? 'YOU' : participant.info.name}
          </Text>
        </View>
        <View style={[styles.row]}>
          <Icon size={12} name={status.isMuted ? 'mic-off-outline' : 'mic-outline'} pack={''} />
        </View>
      </View>
    </View>
  );
};
