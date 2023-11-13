import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
} from 'react-native-webrtc';

import { Text } from '../../Components/atoms';
import { Button } from '../../Components/molecules';
import { createPeerConnection, getLocalStream, WebRTCServer } from '../../Modules/WebRTC';
import styles from './WebRTCScreen.styles';

export const WebRTCScreen: React.FC = () => {
  const [localStream, setlocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream[]>([]);
  const [type, setType] = useState<string>('JOIN');
  const socket = useMemo(() => WebRTCServer(), []);
  const remoteRTCMessage = useRef<any>(null);
  const otherUserId = useRef(null);
  const peerConnection = useRef<RTCPeerConnection>(createPeerConnection());

  function answerCall(data: any) {
    socket.emit('answerCall', data);
    setType('WEBRTC_ROOM');
  }

  function sendCall(data: any) {
    socket.emit('call', data);
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current)
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }
  function sendICEcandidate(data: any) {
    socket.emit('ICEcandidate', data);
  }

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer({});
    await peerConnection.current.setLocalDescription(sessionDescription);
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  useEffect(() => {
    socket.on('newCall', (data) => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
    });

    socket.on('callAnswered', (data) => {
      console.log('CallAnsewered');
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current)
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('users', (data: any) => {
      if (data.length > 0) {
        otherUserId.current = data[data.length - 1];
      }
    });

    socket.on('ICEcandidate', (data) => {
      const message = data.rtcMessage;
      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            })
          )
          .then(() => {
            console.log('SUCCESS');
          })
          .catch((err) => {
            console.log('Error', err);
          });
      }
    });
    getLocalStream()
      .then((stream) => {
        // peerConnection.current.addStream(stream);
        setlocalStream(stream);
        stream.getTracks().map((track) => {
          peerConnection.current.addTrack(track, stream);
        });
      })
      .catch((e) => {
        console.log(e);
      });

    peerConnection.current.addEventListener('connectionstatechange', () => {});
    peerConnection.current.addEventListener('icecandidate', () => {
      console.log('*** icecandidate');
    });
    peerConnection.current.ontrack = (event: any) => {
      setRemoteStream(event.streams);
    };

    peerConnection.current.addEventListener('icecandidateerror', () => {});
    peerConnection.current.addEventListener('iceconnectionstatechange', (event) => {
      console.log('*** iceconnectionstatechange', event);
    });
    peerConnection.current.addEventListener('icegatheringstatechange', () => {});
    peerConnection.current.addEventListener('negotiationneeded', () => {});
    peerConnection.current.addEventListener('signalingstatechange', () => {});
    peerConnection.current.addEventListener('addstream', () => {
      Alert.alert('stream added');
    });
    peerConnection.current.addEventListener('removestream', (event) => {
      console.log(event);
    });

    // Setup ice handling
    peerConnection.current.onicecandidate = (event: any) => {
      console.log('ONICECANDIDATE::');
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
      }
    };

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };
  }, [peerConnection, peerConnection.current]);

  const leave = () => {
    peerConnection.current.close();
    peerConnection.current = createPeerConnection();
    setType('JOIN');
  };

  const inCall = type === 'WEBRTC_ROOM';

  return (
    <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
      {localStream ? (
        <RTCView
          objectFit={'cover'}
          style={styles.localStream}
          streamURL={localStream.toURL()}
          mirror
        />
      ) : (
        <View />
      )}
      {remoteStream.map((stream) => {
        return (
          <RTCView
            objectFit={'cover'}
            style={{
              backgroundColor: 'red',
              flex: 1,
            }}
            streamURL={stream.toURL()}
          />
        );
      })}

      <View style={styles.buttons}>
        <Button onPress={inCall ? leave : processCall}>
          <Text>{inCall ? 'End Call' : 'Process Call'}</Text>
        </Button>
        {type === 'INCOMING_CALL' ? (
          <Button onPress={processAccept}>
            <Text>Process Accept</Text>
          </Button>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
