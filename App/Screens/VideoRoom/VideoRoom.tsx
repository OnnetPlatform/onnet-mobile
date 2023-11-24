import { PageView } from '@HOCs';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import useAlert from '../../Context/AlertContext/AlertContext';
import { useWebrtcContext } from '../../Context/WebrtcContext';
import { Participant } from './components';
import { VideoRoomChatSheet } from './components/VideoRoomChatSheet/VideoRoomChatSheet';

export const VideoRoom: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const { localStream, leave, join, socket } = useWebrtcContext();
  const { configureAlert } = useAlert();
  useEffect(() => {
    configureAlert({
      visible: true,
      title: 'Meeting',
      subtitle:
        'Are you sure you want to join Unified Coponents: Team 1 meeting',
      onPress: () => {
        join();
        configureAlert({ visible: false });
      },
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
