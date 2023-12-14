import PageView from '@HOCs/PageView';
import { BulletinCreators } from '@Khayat/Redux/Actions/BulletinActions';
import { BulletinSelector } from '@Khayat/Redux/Selectors/BulletinSelector';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import { useDispatch, useSelector } from 'react-redux';

export const LiveAnnouncement: React.FC = () => {
  const { remoteStream } = useSelector(BulletinSelector);
  const dispatch = useDispatch();
  console.log(remoteStream);
  useEffect(() => {
    dispatch(BulletinCreators.joinBulletin());
  }, []);

  return (
    <PageView title="Live Announcement">
      {remoteStream ? (
        <RTCView
          style={StyleSheet.absoluteFill}
          streamURL={remoteStream.toURL()}
        />
      ) : (
        <ActivityIndicator />
      )}
    </PageView>
  );
};

export default LiveAnnouncement;
