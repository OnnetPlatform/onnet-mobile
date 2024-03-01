import PageView from '@HOCs/PageView';
import { BulletinCreators } from '@Khayat/Redux/Actions/BulletinActions';
import { BulletinSelector } from '@Khayat/Redux/Selectors/BulletinSelector';
import { RetroLoading } from '@Skia/RetroLoading/RetroLoading';
import { TVNoise } from '@Skia/TVNoise';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { RTCView } from 'react-native-webrtc';
import { useDispatch, useSelector } from 'react-redux';

export const LiveAnnouncement: React.FC = () => {
  const { remoteStream } = useSelector(BulletinSelector);
  const dispatch = useDispatch();
  const hide = useSharedValue(0);

  useEffect(() => {
    dispatch(BulletinCreators.joinBulletin());
  }, []);

  useEffect(() => {
    hide.value = remoteStream ? 1 : 0;
    if (remoteStream) {
      remoteStream.addEventListener('removetrack', () => {
        dispatch(BulletinCreators.setRemoteStream(null));
      });
    }
  }, [remoteStream]);

  useEffect(() => {
    return () => {
      // dispatch(BulletinCreators.setRemoteStream(null));
    };
  }, []);
  return (
    <PageView
      title={'Bulletin Name'}
      loading={!remoteStream}
      isGradientEnabled={true}
      hide={hide}
      edges={['left', 'right']}>
      {!remoteStream ? (
        <>
          <TVNoise />
          <RetroLoading />
        </>
      ) : (
        <Pressable
          onPressIn={() => {
            hide.value = hide.value === 1 ? 0 : 1;
          }}
          style={StyleSheet.absoluteFill}>
          <RTCView
            style={StyleSheet.absoluteFill}
            streamURL={remoteStream.toURL()}
            mirror
          />
        </Pressable>
      )}
    </PageView>
  );
};

export default LiveAnnouncement;
