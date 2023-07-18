import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { MediaStream } from 'react-native-webrtc';
import { WebRTCServer, getLocalStream } from '../../Modules/WebRTC';
import { Socket } from 'socket.io-client';
import { LocalStreamView, Participant } from './components';

export const VideoRoom: React.FC = () => {
  const socket = useMemo<Socket>(() => WebRTCServer(), []);
  const [users, setUsers] = useState<string[]>([]);

  const [localStream, setLocalStream] = useState<MediaStream>();

  useEffect(() => {
    getLocalStream().then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  useEffect(() => {
    socket.on('users', setUsers);
    socket.on('leave', setUsers);

    return () => {
      socket.off('users');
      socket.off('leave');
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
      <LocalStreamView localStream={localStream} />
      <FlatList
        numColumns={2}
        data={users}
        renderItem={({ item, index }) => {
          return (
            <Participant
              size={index % 2 == 0 && index === users.length - 1 ? 'lg' : 'rg'}
              socket={socket}
              userId={item}
              key={item}
              localStream={localStream}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};
export default VideoRoom;
