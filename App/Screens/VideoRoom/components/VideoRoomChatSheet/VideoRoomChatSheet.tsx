import React from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Text } from '../../../../Components/atoms';
import VideoControlsHeader from '../VideoControlsHeader/VideoControlsHeader';
import { useSharedValue } from 'react-native-reanimated';
export const VideoRoomChatSheet: React.FC = () => {
  const index = useSharedValue<number>(0);
  return (
    <BottomSheet
      snapPoints={['30%', '80%']}
      animatedIndex={index}
      index={-1}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={-1} />
      )}
      handleComponent={() => {
        return <VideoControlsHeader />;
      }}>
      <Text>BottomSheet</Text>
    </BottomSheet>
  );
};
