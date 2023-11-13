import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWebrtcContext } from '../../Context/WebrtcContext';
import { useColors } from '../../Theme';
import { Participant } from './components';
import { VideoRoomScreenHeader } from './components';
import { VideoRoomChatSheet } from './components/VideoRoomChatSheet/VideoRoomChatSheet';

export const VideoRoom: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const { localStream, leave, join, socket } = useWebrtcContext();
  const colors = useColors();
  useEffect(() => {
    join();
    socket.on('users', setUsers);
    socket.on('leave', setUsers);
    return () => {
      socket.off('users');
      socket.off('leave');
      leave();
    };
  }, []);

  useEffect(() => {
    if (!localStream) {
      setUsers([]);
    }
  }, [localStream]);

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{ flex: 1, flexGrow: 1, backgroundColor: colors.background }}>
      <VideoRoomScreenHeader />
      <FlatList
        numColumns={2}
        data={users}
        renderItem={({ item }) => {
          return <Participant socket={socket} userId={item} key={item} localStream={localStream} />;
        }}
      />
      <VideoRoomChatSheet />
    </SafeAreaView>
  );
};
export default VideoRoom;
