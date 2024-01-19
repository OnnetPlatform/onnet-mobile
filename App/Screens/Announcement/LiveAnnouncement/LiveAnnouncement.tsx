import PageView from '@HOCs/PageView';
import { BulletinCreators } from '@Khayat/Redux/Actions/BulletinActions';
import { BulletinSelector } from '@Khayat/Redux/Selectors/BulletinSelector';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { RTCView } from 'react-native-webrtc';
import { useDispatch, useSelector } from 'react-redux';

export const LiveAnnouncement: React.FC = () => {
  const { remoteStream } = useSelector(BulletinSelector);
  const dispatch = useDispatch();
  const hide = useSharedValue(1);
  useEffect(() => {
    dispatch(BulletinCreators.joinBulletin());
  }, []);

  return (
    <PageView
      title={'Bulletin Name'}
      loading={!remoteStream}
      isGradientEnabled={true}
      hide={hide}
      edges={['left', 'right']}>
      {remoteStream ? (
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
      ) : (
        <View />
      )}
    </PageView>
  );
};

export default LiveAnnouncement;
