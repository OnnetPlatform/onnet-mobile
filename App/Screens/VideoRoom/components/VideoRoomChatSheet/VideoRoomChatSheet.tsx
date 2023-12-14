import { Icon, Text } from '@Atoms';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { ConferenceSelector } from '@Khayat/Redux/Selectors/ConferenceSelector';
import { useColors } from '@Theme';
import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import VideoControlsHeader from '../VideoControlsHeader/VideoControlsHeader';
import withColors from './VideoRoomChatSheet.styles';

export const VideoRoomChatSheet: React.FC = () => {
  const opacity = useSharedValue<number>(1);
  const ref = useRef<BottomSheet>(null);
  const colors = useColors();
  const styles = withColors(colors);
  const { connected } = useSelector(ConferenceSelector);
  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    []
  );

  useEffect(() => {
    opacity.value = 1;
    opacity.value = withRepeat(withTiming(0, { duration: 1000 }), 10, true);
  }, [ref]);

  useEffect(() => {
    if (!connected) {
      setTimeout(() => {
        ref.current?.close();
      }, 10);
    }
  }, [connected, ref, ref.current]);

  const HandleComponent = useCallback(
    () => (
      <>
        <Animated.View style={[styles.sheetHint, animatedStyle]}>
          <Text fontSize={12} style={styles.textCenter}>
            Press or slide to open chat
          </Text>
        </Animated.View>
        <Animated.View style={[animatedStyle, styles.arrow]}>
          <Icon name={'arrow-ios-downward-outline'} />
        </Animated.View>
        <VideoControlsHeader />
      </>
    ),
    [connected]
  );

  return (
    <BottomSheet
      snapPoints={['30%', '80%']}
      ref={ref}
      index={-1}
      backgroundStyle={{ backgroundColor: colors.background }}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          opacity={0.1}
        />
      )}
      handleComponent={HandleComponent}>
      {connected ? (
        <>
          <BottomSheetFlatList
            ListEmptyComponent={() => (
              <View>
                <Text>Messages will appear here</Text>
              </View>
            )}
            data={[]}
            renderItem={() => <View />}
          />
          <BottomSheetTextInput
            placeholder="Message"
            onBlur={() => ref.current?.snapToIndex(1)}
            style={styles.input}
          />
        </>
      ) : null}
    </BottomSheet>
  );
};
