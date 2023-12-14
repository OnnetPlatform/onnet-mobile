import { Icon, Text } from '@Atoms';
import { Collapsible } from '@Atoms/Collapsible/Collapsible';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Calendar } from '@Molecules/Calendar/Calendar';
import { useColors } from '@Theme';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientCard } from '../../../../Components/Skia/GradientCard/GradientCard';
import { useKeyboard } from '../../../../Hooks/useKeyboard';
import { CreateEventSheetRef } from '../../../../Services/CreateEventRef/CreateEventRef';
import { withInsets } from './ConferenceSheet.styles';

export const CreateEventSheet: React.FC<{
  onClose(): void;
}> = ({ onClose }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [eventDate] = useState<Date>(new Date());
  const colors = useColors();
  const animatedBottomSheetIndex = useSharedValue(1);
  const { width } = useWindowDimensions();
  const collapsibleValue = useSharedValue(0);
  const { isOpen } = useKeyboard();
  const styles = withInsets(colors);

  const insets = useSafeAreaInsets();

  const animatedIcon = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: interpolate(collapsibleValue.value, [0, 1], [0, 180]) + 'deg',
        },
      ],
    };
  });

  const handleComponent = useCallback(
    () => (
      <Text
        style={[styles.title, animatedHandleStyle]}
        fontSize={24}
        weight="bold"
        color={colors.white}>
        Create Event
      </Text>
    ),
    []
  );

  const renderBackDrop = useCallback(
    (props: any) => {
      return (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          pressBehavior={0}
          appearsOnIndex={0}
          opacity={0.6}
          onPress={() => {
            if (isOpen) {
              Keyboard.dismiss();
            } else if (expanded) {
              setExpanded(false);
            } else {
              CreateEventSheetRef.current?.close();
            }
          }}
        />
      );
    },
    [expanded]
  );
  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      top: interpolate(
        animatedBottomSheetIndex.value,
        [-1, 0, 1],
        [44, -44, -44]
      ),
      width: '100%',
      left: interpolate(
        animatedBottomSheetIndex.value,
        [-1, 0, 1],
        [-100, 22, 22]
      ),
      position: 'absolute',
    };
  }, [animatedBottomSheetIndex]);

  useEffect(() => {
    if (expanded) {
      Keyboard.dismiss();
      CreateEventSheetRef.current?.snapToIndex(0);
    }
  }, [expanded, CreateEventSheetRef.current]);

  return (
    <BottomSheet
      backgroundComponent={() => (
        <View style={[StyleSheet.absoluteFill, styles.background]}>
          <GradientCard />
        </View>
      )}
      backdropComponent={renderBackDrop}
      handleComponent={handleComponent}
      enableDynamicSizing={true}
      ref={CreateEventSheetRef}
      animatedIndex={animatedBottomSheetIndex}
      backgroundStyle={{ paddingBottom: insets.bottom }}
      onClose={onClose}
      index={-1}>
      <BottomSheetView
        style={[styles.bottomSheetBody, { paddingBottom: insets.bottom }]}>
        <Text
          style={styles.label}
          fontSize={16}
          weight="bold"
          color={colors.black}>
          Title
        </Text>
        <BottomSheetTextInput
          onFocus={() => setExpanded(false)}
          onBlur={() => setExpanded(true)}
          style={styles.titleInput}
          onEndEditing={(e) => {
            console.log(e.nativeEvent.text);
          }}
        />
        <Text
          style={styles.label}
          fontSize={16}
          weight="bold"
          color={colors.black}>
          Description
        </Text>
        <BottomSheetTextInput
          onFocus={() => setExpanded(false)}
          onBlur={() => setExpanded(true)}
          style={styles.titleInput}
          multiline
          onEndEditing={(e) => {
            console.log(e.nativeEvent.text);
          }}
        />
        <Pressable
          style={[styles.calendarIcon, styles.label]}
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
            <Icon
              name={'arrow-ios-downward-outline'}
              pack={''}
              fill={colors.black}
            />
          </Animated.View>
        </Pressable>

        <Collapsible animatedValue={collapsibleValue} expanded={expanded}>
          <Calendar width={width - 64} />
        </Collapsible>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CreateEventSheet;
