import moment from 'moment';
import React from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Blur, Icon, Text } from '../../../Components/atoms';
import { Notification as NotificationType } from '../data';
import styles from './Notification.styles';
import { NotificationIcon } from './NotificationIcon';
import Texture from '@Skia/Texture/Texture';

const TOUCH_SLOP = 5;
const TIME_TO_ACTIVATE_PAN = 25;

export const Notification: React.FC<{
  notification: NotificationType;
  index: number;
}> = ({ notification, index }) => {
  const { width } = useWindowDimensions();
  const x = useSharedValue(0);
  const context = useSharedValue(0);
  const visible_offset = width / 2.5;
  const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });
  const gesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((e) => {
      x.value = withSpring(0, { damping: 50 });
      context.value = 0;
      touchStart.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
        time: Date.now(),
      };
    })
    .onTouchesMove((e, state) => {
      if (Date.now() - touchStart.value.time > TIME_TO_ACTIVATE_PAN) {
        state.activate();
      } else if (
        Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
        Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
      ) {
        state.fail();
      }
    })
    .onBegin(() => {
      context.value = x.value;
    })
    .onChange((e) => {
      if (e.translationX + context.value > -10) {
        x.value = context.value + e.translationX;
      }
    })
    .onEnd((e) => {
      const isOpened = e.translationX > visible_offset;
      x.value = withSpring(isOpened ? visible_offset : 0, { damping: 50 });
      context.value = x.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
    flexDirection: 'row',
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    width:
      x.value > 0
        ? interpolate(x.value, [0, visible_offset], [0, visible_offset])
        : 0,
    transform: [{ translateX: x.value > 0 ? -x.value : 0 }],
    opacity:
      x.value > visible_offset
        ? 1
        : interpolate(x.value, [0, visible_offset], [0, 1]),
  }));

  const animatedIcon = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          x.value > visible_offset
            ? 1
            : interpolate(x.value, [0, visible_offset], [0, 1]),
      },
    ],
  }));

  return (
    <Animated.View style={animatedStyle} entering={FadeIn.delay(100 * index)}>
      <Texture />
      <Animated.View style={[animatedButtonStyle, styles.closeIcon]}>
        <Pressable style={styles.deleteButton} onPress={() => {}}>
          <Blur style={[styles.button]}>
            <Animated.View style={[animatedIcon]}>
              <Icon name={'checkmark-outline'} fill={'white'} />
            </Animated.View>
          </Blur>
          <Animated.View style={[styles.button]}>
            <Animated.View style={[animatedIcon]}>
              <Icon name={'trash-outline'} fill={'white'} />
            </Animated.View>
          </Animated.View>
        </Pressable>
      </Animated.View>
      <GestureDetector userSelect="none" gesture={gesture}>
        <View style={styles.notification}>
          <NotificationIcon notification={notification} />
          <View style={styles.left}>
            <Text>{moment(notification.createdDate).fromNow()}</Text>
            <Text style={styles.top} weight="semibold">
              {notification.title}
            </Text>
          </View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default Notification;
