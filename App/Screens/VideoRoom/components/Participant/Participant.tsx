import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { MediaStream, RTCIceCandidate, RTCSessionDescription, RTCView } from 'react-native-webrtc';
import styles from './Participant.styles';
import { Button } from '../../../../Components/molecules';
import { Text } from '../../../../Components/atoms';
import { createPeerConnection } from '../../../../Modules/WebRTC';
import { Socket } from 'socket.io-client';

export const Participant: React.FC<{
  localStream: MediaStream | undefined;
  socket: Socket;
  userId: string;
  size: 'lg' | 'rg';
}> = ({ localStream, socket, userId, size }) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [type, setType] = useState<string>('JOIN');
  const peerConnection = useRef(createPeerConnection());
  const remoteAnswer = useRef<RTCSessionDescription>();
  const otherUserId = useRef<string>();
  async function createOffer() {
    const sessionDescription = await peerConnection.current.createOffer({});
    peerConnection.current.setLocalDescription(sessionDescription);
    sendOffer(sessionDescription);
  }

  async function createAnswer() {
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(remoteAnswer.current));
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
      if (data.callerId !== userId) return;
      remoteAnswer.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING');
    });

    socket.on('answer', (data) => {
      if (data.callerId !== userId) return;
      remoteAnswer.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(new RTCSessionDescription(remoteAnswer.current));
      setType('WEBRTC_ROOM');
    });

    socket.on('candidateConnected', (data) => {
      if (data.sender !== userId) return;
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
          .catch((e) => {});
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

    return () => {
      socket.off('offer');
      socket.off('answer');
    };
  }, [peerConnection, peerConnection.current, userId]);

  useEffect(() => {
    if (localStream) {
      localStream.getTracks().map((track) => {
        track.enabled = true;
        try {
          peerConnection.current.addTrack(track, localStream);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [localStream, userId]);
  const dynamicWidth = () => {
    const style: ViewStyle = {
      width: size === 'lg' ? '100%' : '50%',
    };
    return style;
  };

  if (!remoteStream)
    return (
      <View style={[styles.container, dynamicWidth()]}>
        <Button onPress={createOffer}>
          <Text>Call</Text>
        </Button>
        {type === 'INCOMING' ? (
          <Button onPress={createAnswer}>
            <Text>Answer</Text>
          </Button>
        ) : null}
      </View>
    );
  return (
    <RTCView
      objectFit="cover"
      mirror
      streamURL={remoteStream?.toURL()}
      style={[styles.container, dynamicWidth()]}
    />
  );
};

export default Participant;
