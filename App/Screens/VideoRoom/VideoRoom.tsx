import { Icon, Separator, Text } from '@Atoms';
import { PageView } from '@HOCs';
import { useColors } from '@Theme';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import useAlert from '../../Context/AlertContext/AlertContext';
import { useWebrtcContext } from '../../Context/WebrtcContext';
import { Participant } from './components';
import { VideoRoomChatSheet } from './components/VideoRoomChatSheet/VideoRoomChatSheet';
import { alertStyle } from './VideoRoom.styles';

export const VideoRoom: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const { localStream, leave, join, socket } = useWebrtcContext();
  const { configureAlert } = useAlert();
  const colors = useColors();
  const alertStyles = alertStyle(colors);
  const onAlertJoinPressed = () => {
    configureAlert({ visible: false });
    join();
  };
  useEffect(() => {
    configureAlert({
      customView: () => (
        <>
          <Text style={alertStyles.textCenter} weight="bold" fontSize={18}>
            Unified components
          </Text>
          <Separator />
          <Text style={alertStyles.textCenter}>
            Choose your audio and video settings
          </Text>
          <Separator size="md" />
          <Separator size="md" />
          <View style={alertStyles.buttonsWrapper}>
            <Pressable>
              <Icon name={'mic-off-outline'} />
            </Pressable>
            <Pressable>
              <Icon name={'video-off-outline'} />
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

  return (
    <PageView loading={users.length === 0} title="Conference">
      <>
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
        <VideoRoomChatSheet />
      </>
    </PageView>
  );
};
export default VideoRoom;
