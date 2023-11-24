import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useColors } from '@Theme';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Icon, Text } from '../../../../Components/atoms';
import VideoControlsHeader from '../VideoControlsHeader/VideoControlsHeader';
import withColors from './VideoRoomChatSheet.styles';

export const VideoRoomChatSheet: React.FC = () => {
  const opacity = useSharedValue<number>(1);
  const ref = useRef<BottomSheet>(null);
  const colors = useColors();
  const styles = withColors(colors);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    []
  );

  useEffect(() => {
    ref.current?.snapToIndex(0);
    opacity.value = 1;
    opacity.value = withRepeat(withTiming(0, { duration: 1000 }), 10, true);
  }, [ref]);
  return (
    <BottomSheet
      snapPoints={['30%', '80%']}
      index={-1}
      ref={ref}
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
      handleComponent={() => {
        return (
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
        );
      }}>
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
    </BottomSheet>
  );
};
