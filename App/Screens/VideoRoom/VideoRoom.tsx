import { Icon, Separator, Text } from '@Atoms';
import { PageView } from '@HOCs';
import { useColors } from '@Theme';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';

import useAlert from '../../Context/AlertContext/AlertContext';
import { useWebrtcContext } from '../../Context/WebrtcContext';
import { Participant } from './components';
import { VideoRoomChatSheet } from './components/VideoRoomChatSheet/VideoRoomChatSheet';
import { alertStyle } from './VideoRoom.styles';

const uri =
  'https://images.unsplash.com/photo-1700605149722-50c0d7fe003d?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
export const VideoRoom: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [joined, setJoined] = useState<boolean>(false);
  const { localStream, leave, join, socket, connect, connected } =
    useWebrtcContext();

  const { configureAlert } = useAlert();
  const colors = useColors();
  const alertStyles = alertStyle(colors);

  const onAlertJoinPressed = () => {
    configureAlert({ visible: false });
    setJoined(true);
    join();
  };

  useEffect(() => {
    connect();
    socket.on('users', setUsers);
    socket.on('leave', setUsers);
    return () => {
      socket.off('users');
      socket.off('leave');
      socket.disconnect();
      leave();
    };
  }, []);

  useEffect(() => {
    if (!localStream) {
      setUsers([]);
    }
  }, [localStream]);

  useEffect(() => {
    if (!joined) {
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
                  data={users}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  // @ts-ignore
                  style={alertStyles.avatarContainer(users.length)}
                  horizontal
                  renderItem={({ item, index }) => (
                    <View>
                      <Image
                        key={item}
                        source={{ uri }}
                        // @ts-ignore
                        style={alertStyles.avatar(index)}
                      />
                    </View>
                  )}
                />
              </>
            ) : null}

            <Separator size="md" />
            <View style={alertStyles.buttonsWrapper}>
              <Pressable style={alertStyles.center}>
                <Icon name={'mic-off-outline'} />
                <Text style={alertStyles.textCenter}>Audio</Text>
              </Pressable>
              <Pressable style={alertStyles.center}>
                <Icon name={'video-off-outline'} />
                <Text style={alertStyles.textCenter}>Video</Text>
              </Pressable>
              <Pressable style={alertStyles.center}>
                <Icon name={'settings-outline'} />
                <Text style={alertStyles.textCenter}>Settings</Text>
              </Pressable>
            </View>
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
    }
  }, [users, joined]);

  return (
    <PageView loading={!connected} title="Meeting name">
      <>
        {joined ? (
          <FlatList
            numColumns={2}
            data={users}
            renderItem={({ item }) => {
              return (
                <Participant
                  socket={socket}
                  userId={item}
                  key={item}
                  localStream={localStream}
                />
              );
            }}
          />
        ) : null}
        <VideoRoomChatSheet />
      </>
    </PageView>
  );
};
export default VideoRoom;
