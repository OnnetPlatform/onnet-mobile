import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../../../Components/atoms';
import { Collapsible } from '../../../../Components/atoms/Collapsible/Collapsible';
import { useColors } from '../../../../Theme';
import { CustomBackground } from './CustomBackground';
import { Calendar } from '../../../../Components/molecules/Calendar/Calendar';
import { withInsets } from './ConferenceSheet.styles';
import moment from 'moment';
import Animated, {
  interpolate,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { CreateEventSheetRef } from '../../../../Services/CreateEventRef/CreateEventRef';
import { GradientCard } from '../../../../Components/Skia/GradientCard/GradientCard';

export const CreateEventSheet: React.FC<{
  onClose(): void;
}> = ({ onClose }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [eventDate, setDate] = useState<Date>(new Date());
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const bottomSheetInputRef = useRef<any>(null);
  const animatedBottomSheetIndex = useSharedValue(1);
  const { width } = useWindowDimensions();
  const collapsibleValue = useDerivedValue(() => 0);
  const { state, height } = useAnimatedKeyboard();
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
  const handleComponent = () => <View />;

  useEffect(() => {
    if (!expanded) {
      if (state.value === 1) {
        resetKeyboard();
      }
    } else {
    }
  }, [expanded, CreateEventSheetRef.current]);

  const animatedHandleStyle = useAnimatedStyle(() => {
    const position =
      state.value === 2 ? animatedContentHeight.value + height.value : animatedContentHeight.value;
    return {
      position: 'absolute',
      zIndex: 100,
      marginLeft: 24,
      bottom: interpolate(animatedBottomSheetIndex.value, [-1, 0, 1], [-100, position, position]),
    };
  }, [animatedContentHeight, height, state]);

  return (
    <>
      <Text style={[styles.title, animatedHandleStyle]} fontSize={24} weight="bold">
        Create Event
      </Text>
      <BottomSheet
        backgroundComponent={GradientCard}
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
        style={styles.sheet}
        snapPoints={animatedSnapPoints}
        ref={CreateEventSheetRef}
        animatedIndex={animatedBottomSheetIndex}
        onClose={onClose}
        index={-1}>
        <BottomSheetScrollView
          style={[styles.bottomSheetBody, { paddingBottom: 32 }]}
          onLayout={handleContentLayout}>
          <Text style={styles.label} fontSize={16} weight="bold">
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
            <Text fontSize={16} weight="bold">
              Date{' '}
            </Text>
            <Text style={[{ textTransform: 'uppercase' }]} fontSize={12} weight="regular">
              {moment(eventDate).format('(dddd) DD, MMMM, yyyy')}
            </Text>
            <Animated.View style={animatedIcon}>
              <Icon name={'arrow-ios-downward-outline'} pack={''} />
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
