import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../../../Components/atoms';
import { Collapsible } from '../../../../Components/atoms/Collapsible/Collapsible';
import { useColors } from '../../../../Theme';
import { Calendar } from '../../../../Components/molecules/Calendar/Calendar';
import { withInsets } from './ConferenceSheet.styles';
import moment from 'moment';
import Animated, {
  interpolate,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { CreateEventSheetRef } from '../../../../Services/CreateEventRef/CreateEventRef';
import { GradientCard } from '../../../../Components/Skia/GradientCard/GradientCard';
import { useIsFocused } from '@react-navigation/native';

export const CreateEventSheet: React.FC<{
  onClose(): void;
}> = ({ onClose }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [eventDate] = useState<Date>(new Date());
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const bottomSheetInputRef = useRef<any>(null);
  const animatedBottomSheetIndex = useSharedValue(1);
  const { width } = useWindowDimensions();
  const collapsibleValue = useSharedValue(0);
  const { state, height } = useAnimatedKeyboard();
  const isFocused = useIsFocused();
  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], [expanded]);
  const { animatedContentHeight, animatedSnapPoints, handleContentLayout, animatedHandleHeight } =
    useBottomSheetDynamicSnapPoints(snapPoints);

  const styles = withInsets(insets, colors);
  const animatedIcon = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: interpolate(collapsibleValue.value, [0, 1], [0, 180]) + 'deg',
        },
      ],
    };
  });

  const resetKeyboard = () => {
    setTimeout(() => {
      bottomSheetInputRef.current?.blur();
      bottomSheetInputRef.current?.focus();
    }, 10);
  };

  const handleComponent = () => (
    <Text
      style={[styles.title, animatedHandleStyle]}
      fontSize={24}
      weight="bold"
      color={colors.white}>
      Create Event
    </Text>
  );

  useEffect(() => {
    if (!expanded) {
      if (state.value === 1) {
        resetKeyboard();
      }
    }
  }, [expanded, CreateEventSheetRef.current]);

  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      top: interpolate(animatedBottomSheetIndex.value, [-1, 0, 1], [44, -44, -44]),
      position: 'absolute',
      width: '100%',
      left: interpolate(animatedBottomSheetIndex.value, [-1, 0, 1], [-100, 22, 22]),
    };
  }, [animatedContentHeight, height, state, animatedBottomSheetIndex]);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        CreateEventSheetRef.current?.snapToIndex(-1);
        animatedBottomSheetIndex.value = -1;
      }, 0);
    }
  }, [isFocused]);
  return (
    <>
      <BottomSheet
        backgroundComponent={() => (
          <View style={[StyleSheet.absoluteFill, { borderRadius: 32, overflow: 'hidden' }]}>
            <GradientCard />
          </View>
        )}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            enableTouchThrough={true}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.6}
          />
        )}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        handleComponent={handleComponent}
        containerStyle={{ alignItems: 'center' }}
        snapPoints={animatedSnapPoints}
        ref={CreateEventSheetRef}
        animatedIndex={animatedBottomSheetIndex}
        onClose={onClose}
        index={-1}>
        <BottomSheetScrollView
          style={[styles.bottomSheetBody, { paddingBottom: 32 }]}
          onLayout={handleContentLayout}>
          <Text style={styles.label} fontSize={16} weight="bold" color={colors.black}>
            Title
          </Text>
          <BottomSheetTextInput
            onFocus={() => setExpanded(false)}
            onBlur={() => {
              setExpanded(true);
            }}
            ref={bottomSheetInputRef}
            style={styles.titleInput}
          />
          <Pressable
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: colors.blur,
                padding: 8,
                borderRadius: 4,
              },
              styles.label,
            ]}
            onPressIn={() => {
              setExpanded(!expanded);
            }}>
            <Text fontSize={16} weight="bold" color={colors.black}>
              Date{' '}
            </Text>
            <Text
              style={[{ textTransform: 'uppercase' }]}
              fontSize={12}
              weight="regular"
              color={colors.black}>
              {moment(eventDate).format('(dddd) DD, MMMM, yyyy')}
            </Text>
            <Animated.View style={animatedIcon}>
              <Icon name={'arrow-ios-downward-outline'} pack={''} fill={colors.black} />
            </Animated.View>
          </Pressable>

          <Collapsible animatedValue={collapsibleValue} expanded={expanded}>
            <Calendar width={width - 64} />
          </Collapsible>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default CreateEventSheet;
