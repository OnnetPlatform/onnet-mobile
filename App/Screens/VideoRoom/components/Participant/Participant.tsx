import { Text } from '@Atoms';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import {
  MediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
} from 'react-native-webrtc';
import { Socket } from 'socket.io-client';

import { createPeerConnection } from '../../../../Modules/WebRTC';
import { useColors } from '../../../../Theme';
import { useThemedStyle } from './Participant.styles';

export const Participant: React.FC<{
  localStream: MediaStream | undefined;
  socket: Socket;
  userId: string;
}> = ({ localStream, socket, userId }) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [type, setType] = useState<string>('JOIN');
  const peerConnection = useRef(createPeerConnection());
  const remoteAnswer = useRef<RTCSessionDescription>();
  const otherUserId = useRef<string>();
  const colors = useColors();
  const styles = useThemedStyle(colors);

  async function createOffer() {
    const sessionDescription = await peerConnection.current.createOffer({});
    peerConnection.current.setLocalDescription(sessionDescription);
    sendOffer(sessionDescription);
  }

  async function createAnswer() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteAnswer.current)
    );
    const sd = await peerConnection.current.createAnswer();
    peerConnection.current.setLocalDescription(sd);
    socket.emit('answer', {
      callerId: userId,
      rtcMessage: sd,
    });
  }

  function sendOffer(data: RTCSessionDescription) {
    socket.emit('offer', {
      calleeId: userId,
      rtcMessage: data,
    });
  }

  useEffect(() => {
    socket.on('offer', (data) => {
      if (data.from !== userId) {
        return;
      }
      remoteAnswer.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING');
    });

    socket.on('answer', (data) => {
      if (data.from !== userId) {
        return;
      }
      remoteAnswer.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteAnswer.current)
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('candidateConnected', (data) => {
      if (data.sender !== userId) {
        return;
      }
      let message = data.rtcMessage;
      if (peerConnection.current) {
        const candidate = new RTCIceCandidate({
          candidate: message.candidate,
          sdpMid: message.id,
          sdpMLineIndex: message.label,
        });
        peerConnection?.current
          .addIceCandidate(candidate)
          .then(() => {})
          .catch(() => {});
      }
    });
    peerConnection.current.onicecandidate = (event: any) => {
      if (event.candidate) {
        socket.emit('candidateConnected', {
          calleeId: userId,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
      }
    };
    peerConnection.current.ontrack = (event: any) => {
      setRemoteStream(event.streams[0]);
    };

    socket.on('mute', (data: any) => {
      if (data.userId === userId) {
        console.log(data);
      }
    });
    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('mute');
      leave();
    };
  }, [peerConnection, peerConnection.current, userId]);

  useEffect(() => {
    if (localStream) {
      localStream.getTracks().map((track) => {
        try {
          peerConnection.current.addTrack(track, localStream);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [localStream, userId]);

  useEffect(() => {
    if (remoteStream) {
      remoteStream.getTracks().map((track) => {
        track.addEventListener('mute', console.log);
      });
    }
  }, [remoteStream]);

  const leave = useCallback(() => {
    peerConnection.current.close();
    setRemoteStream(undefined);
    localStream?.release();
  }, [peerConnection.current, localStream]);

  useEffect(() => {
    if (!localStream) {
      peerConnection.current.close();
    }
  }, [localStream, peerConnection.current, peerConnection]);

  useEffect(() => {
    if (type === 'INCOMING') {
      createAnswer();
    }
  }, [type]);

  useEffect(() => {
    createOffer();
  }, []);

  if (!remoteStream) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text>{userId}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <RTCView
        objectFit="cover"
        streamURL={remoteStream?.toURL()}
        style={styles.container}
      />
    </View>
  );
};

export default memo(Participant, (prev, next) => {
  return prev.userId === next.userId;
});
