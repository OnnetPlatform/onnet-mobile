import { Icon, Separator, Text } from '@Atoms';
import { PageView } from '@HOCs';
import { ConferenceCreators } from '@Khayat/Redux/Actions/Conference';
import { ConferenceSelector } from '@Khayat/Redux/Selectors/ConferenceSelector';
import { useColors } from '@Theme';
import React, { useCallback, useEffect } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { MediaStream } from 'react-native-webrtc';
import { useDispatch, useSelector } from 'react-redux';

import useAlert from '../../Context/AlertContext/AlertContext';
import { Participant } from './components';
import { useMediaControl } from './components/VideoControlsHeader/useMediaControl';
import { VideoRoomChatSheet } from './components/VideoRoomChatSheet/VideoRoomChatSheet';
import { alertStyle, avatar } from './VideoRoom.styles';
import { FlashList } from '@shopify/flash-list';

const uri =
  'https://images.unsplash.com/photo-1700605149722-50c0d7fe003d?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const VideoRoom: React.FC = () => {
  const { users, remoteStreams, joined, connected } =
    useSelector(ConferenceSelector);
  const dispatch = useDispatch();
  const { configureAlert } = useAlert();
  const colors = useColors();
  const alertStyles = alertStyle(colors);
  const { mute, mediaStatus, unmute, enableCamera, disableCamera } =
    useMediaControl();
  const onAlertJoinPressed = () => {
    configureAlert({ visible: false });
    dispatch(ConferenceCreators.join());
  };

  const showJoinModal = () => {
    configureAlert({
      customView: () => (
        <>
          <Text style={alertStyles.textCenter} weight="bold" fontSize={18}>
            Meeting name
          </Text>
          <Separator />
          <Text style={alertStyles.textCenter}>
            Choose your audio and video settings
          </Text>
          {users.length > 0 ? (
            <>
              <Separator size="md" />
              <FlatList
                data={users.slice(0, 5)}
                showsHorizontalScrollIndicator={false}
                style={alertStyles.avatarContainer}
                horizontal
                contentContainerStyle={{ alignItems: 'center' }}
                ListFooterComponent={
                  users.length > 5 ? (
                    <Text style={alertStyles.separator} weight={'bold'}>
                      +{users.length - 5}
                    </Text>
                  ) : null
                }
                renderItem={({ item, index }) => (
                  <Image
                    key={item}
                    source={{ uri }}
                    style={avatar(index, colors)}
                  />
                )}
              />
            </>
          ) : null}

          <Separator size="md" />
          <Separator size="md" />
          <View style={alertStyles.buttonsWrapper}>
            <Pressable
              style={alertStyles.center}
              onPress={mediaStatus.audio ? mute : unmute}>
              <Icon
                name={mediaStatus.audio ? 'mic-outline' : 'mic-off-outline'}
              />
              <Text style={alertStyles.textCenter}>Audio</Text>
            </Pressable>
            <Pressable
              style={alertStyles.center}
              onPress={mediaStatus.video ? disableCamera : enableCamera}>
              <Icon
                name={mediaStatus.video ? 'video-outline' : 'video-off-outline'}
              />
              <Text style={alertStyles.textCenter}>Video</Text>
            </Pressable>
            <Pressable style={alertStyles.center}>
              <Icon name={'settings-outline'} />
              <Text style={alertStyles.textCenter}>Settings</Text>
            </Pressable>
          </View>
          <Separator size="md" />
          <Separator size="md" />
          <Pressable onPress={onAlertJoinPressed} style={alertStyles.button}>
            <Text
              color={colors.background}
              style={alertStyles.textCenter}
              fontSize={16}
              weight="bold">
              Join
            </Text>
          </Pressable>
        </>
      ),
      visible: true,
    });
  };

  useEffect(() => {
    if (connected && !joined) {
      showJoinModal();
    }
  }, [connected, joined, users, mediaStatus]);

  const renderRemoteStreams = useCallback(
    ({ item }: { item: { id: string; stream: MediaStream } }) => {
      return <Participant stream={item.stream} />;
    },
    [remoteStreams]
  );

  useEffect(() => {
    if (!joined) {
      dispatch(ConferenceCreators.connect());
    }
  }, [joined]);

  return (
    <PageView title="Meeting name">
      <>
        <FlashList
          numColumns={2}
          data={remoteStreams}
          renderItem={renderRemoteStreams}
        />
        <VideoRoomChatSheet />
      </>
    </PageView>
  );
};
export default VideoRoom;
