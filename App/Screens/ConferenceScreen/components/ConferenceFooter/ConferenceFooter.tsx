import { ActivityIndicator, Pressable, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useThemedStyle } from './ConferenceFooter.styles';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useColors } from '../../../../Theme';
import { Text, Icon } from '../../../../Components/atoms';
import useMediaControls from '../../../../Services/MediaControl/useMediaControls';
import {
  Conference,
  ConferenceStatus,
} from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import { useNavigation } from '@react-navigation/native';
import { Warda } from '../../../../../App';

const ConferenceFooter: React.FC<{
  conference: Conference | null;
  leaveConference(): void;
  isSDKReady: boolean;
  status: ConferenceStatus | undefined;
}> = ({ conference, leaveConference, isSDKReady, status }) => {
  const styles = useThemedStyle();
  const sharedValue = useSharedValue(68);
  const colors = useColors();
  const { width } = useWindowDimensions();
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigation = useNavigation();
  const { startAudio, startVideo, stopAudio, switchCamera, switchSpeaker, mediaStatus, stopVideo } =
    useMediaControls();

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      sharedValue.value,
      [68, width - 44],
      [colors.background, colors.blur]
    ),
    width: sharedValue.value,
  }));

  useEffect(() => {
    // @ts-ignore
    setLoaded(status && status === 'JOINED');
  }, [status]);

  useEffect(() => {
    sharedValue.value = withTiming(!loaded ? 68 : width - 44, { duration: 200 });
  }, [loaded]);

  return (
    <View style={styles.footerWrapper}>
      <Animated.View style={[animatedStyle, styles.fab]}>
        <View style={styles.footer}>
          {loaded ? (
            <Pressable
              onPress={mediaStatus.video ? stopVideo : startVideo}
              style={styles.iconWrapper}>
              <Icon
                style={styles.icon}
                name={mediaStatus.video ? 'video-outline' : 'video-off-outline'}
                pack={''}
              />
            </Pressable>
          ) : (
            <Pressable
              // @ts-ignore
              disabled={!['LEFT', 'ERROR'].includes(status)}
              onPress={() => navigation.goBack()}
              style={styles.iconWrapper}>
              {status === 'LEFT' || status === 'ERROR' ? (
                <Icon name={'close-outline'} pack={''} />
              ) : (
                <View
                  style={{
                    width: 20,
                    justifyContent: 'center',
                    height: 20,
                  }}>
                  <Warda />
                </View>
              )}
            </Pressable>
          )}

          <Pressable
            onPress={mediaStatus.audio ? stopAudio : startAudio}
            style={styles.iconWrapper}>
            <Icon
              style={styles.icon}
              name={!mediaStatus.audio ? 'mic-off-outline' : 'mic-outline'}
              pack={''}
            />
          </Pressable>

          <Pressable onPress={leaveConference} style={styles.endCallIcon}>
            <Icon style={styles.icon} name={'phone-outline'} pack={''} />
          </Pressable>

          <Pressable onPress={switchCamera} style={styles.iconWrapper}>
            <Icon style={styles.icon} name={'sync-outline'} pack={''} />
          </Pressable>

          <Pressable onPress={switchSpeaker} style={styles.iconWrapper}>
            <Icon style={styles.icon} name={'volume-up-outline'} pack={''} />
          </Pressable>
        </View>
      </Animated.View>
      {loaded ? null : (
        <Text style={{ marginLeft: 11 }} weight={'bold'}>
          {status || 'Initializing...'}
        </Text>
      )}
    </View>
  );
};

export default ConferenceFooter;
