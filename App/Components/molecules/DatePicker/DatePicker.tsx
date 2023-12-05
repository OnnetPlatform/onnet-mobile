import { Icon, Text } from '@Atoms';
import { BlurView } from '@react-native-community/blur';
import { useColors } from '@Theme';
import numeral from 'numeral';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, useColorScheme, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Layout,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { LayoutInsets } from '../Calendar/components/Slot/types';
import styles, { indicatorStyle } from './DatePicker.styles';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);
export const DatePicker: React.FC<{
  visible: boolean;
  layout: LayoutInsets | undefined;
  onRequestClose(): void;
}> = ({ visible = false, layout, onRequestClose }) => {
  const colors = useColors();
  const scheme = useColorScheme();
  const isDark = useMemo(() => scheme === 'dark', [scheme]);
  const [hour, setHour] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(30);
  const animatedHoursValue = useSharedValue(48);
  const animatedMinutesValue = useSharedValue(48);
  const themedStyles = styles(colors);
  const translateY = useSharedValue(0);
  const animateContainerStyle = useAnimatedStyle(() => {
    return {
      height: 180,
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const animatedBorders = useAnimatedStyle(() => ({
    borderWidth: withDelay(
      0,
      withTiming(visible ? 2 : 0, { duration: 1000, easing: Easing.linear })
    ),
  }));
  const hourGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      hour: number;
    }
  >({
    onStart: (_, context) => {
      context.hour = hour;
    },
    onActive: (e, context) => {
      animatedHoursValue.value = withTiming(
        40,
        { duration: 100, easing: Easing.linear },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setHour)(
              Math.max(
                Math.min(context.hour + Math.round(-e.translationY / 30), 23),
                0
              )
            );
            animatedHoursValue.value = withTiming(48, {
              duration: 100,
              easing: Easing.linear,
            });
          }
        }
      );
    },
  });

  const minutesGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      minutes: number;
    }
  >({
    onStart: (_, context) => {
      context.minutes = minutes;
    },
    onActive: (e, context) => {
      animatedMinutesValue.value = withTiming(
        40,
        { duration: 100, easing: Easing.linear },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setMinutes)(
              Math.max(
                Math.min(
                  context.minutes + Math.round(-e.translationY / 10),
                  59
                ),
                0
              )
            );
            animatedMinutesValue.value = withTiming(48, {
              duration: 100,
              easing: Easing.linear,
            });
          }
        }
      );
      runOnJS(setMinutes)(
        Math.max(
          Math.min(context.minutes + Math.round(-e.translationY / 10), 59),
          0
        )
      );
    },
  });

  const animatedText = useAnimatedStyle(() => ({
    fontSize: animatedHoursValue.value,
  }));
  const animatedMinutesText = useAnimatedStyle(() => ({
    fontSize: animatedMinutesValue.value,
  }));

  const animatedBlurProps = useAnimatedProps(() => ({
    blurAmount: withDelay(
      200,
      withTiming(visible ? 30 : 0, { duration: 2000, easing: Easing.linear })
    ),
  }));

  useEffect(() => {
    setHour(12);
    setMinutes(30);
    animatedHoursValue.value = 48;
    animatedMinutesValue.value = 48;
    if (!layout) {
      translateY.value = 0;
    } else {
      translateY.value = withTiming(layout.pageY - 204, {
        duration: 50,
        easing: Easing.linear,
      });
    }
    if (!visible) {
      translateY.value = 0;
    }
  }, [layout, layout?.pageY, visible]);

  return (
    <Modal
      onRequestClose={onRequestClose}
      transparent
      animationType="fade"
      visible={visible}>
      <Pressable onPress={onRequestClose} style={themedStyles.container} />

      <Animated.View style={[animateContainerStyle]}>
        <AnimatedBlur
          animatedProps={animatedBlurProps}
          style={[themedStyles.clockComponent, animatedBorders]}
          blurType={isDark ? 'dark' : 'light'}>
          <View style={themedStyles.header}>
            <Text fontSize={24} weight="bold">
              Event Time
            </Text>
            <Pressable style={themedStyles.checkButton}>
              <Icon
                name={'checkmark-outline'}
                style={themedStyles.checkIcon}
                fill={colors.text}
              />
            </Pressable>
          </View>
          <Text style={themedStyles.subtitle} weight="light">
            Slide up and down over hours and minutes to set them up
          </Text>
          <View style={themedStyles.body}>
            <PanGestureHandler onGestureEvent={hourGestureHandler}>
              <Animated.View layout={Layout} style={themedStyles.section}>
                <Animated.Text style={[themedStyles.number, animatedText]}>
                  {numeral(
                    hour > 12 || hour === 0 ? Math.abs(hour - 12) : hour
                  ).format('00')}
                </Animated.Text>
              </Animated.View>
            </PanGestureHandler>
            <Text fontSize={24}>:</Text>
            <PanGestureHandler onGestureEvent={minutesGestureHandler}>
              <Animated.View layout={Layout} style={themedStyles.section}>
                <Animated.Text
                  style={[themedStyles.number, animatedMinutesText]}>
                  {numeral(minutes).format('00')}
                </Animated.Text>
              </Animated.View>
            </PanGestureHandler>
            <Text>{hour >= 12 ? 'PM' : 'AM'}</Text>
          </View>
        </AnimatedBlur>
        <Animated.View style={indicatorStyle(colors, layout).indicator} />
      </Animated.View>
    </Modal>
  );
};
export default DatePicker;
