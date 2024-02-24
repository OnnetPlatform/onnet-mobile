import Text from '@Atoms/Text';
import { useColors } from '@Theme/index';
import { humanizeDate } from '@Utils/dateFormatter';
import { useMarkdownStyles } from '@Utils/useMarkdownStyles';
import { MarkdownTextInput } from '@expensify/react-native-live-markdown';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  interpolateColor,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import Separator from '@Atoms/Separator';
const reactions = ['❤️', '🤣', '😮', '😢', '😡'];

export const TextMessage: React.FC<{
  item: { message: string; createdAt: string };
}> = ({ item }) => {
  const colors = useColors();
  const markdownStyle = useMarkdownStyles();
  const isActive = useSharedValue(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const ref = useAnimatedRef<Animated.View>();
  const layout = useSharedValue({ pageY: 0, height: 0 });
  const stickerIndex = useSharedValue(-1);

  const setLayout = () => {
    runOnUI(() => {
      const measurement = measure(ref);
      console.log(measurement);
      if (measurement)
        layout.value = {
          pageY: measurement?.pageY,
          height: measurement?.height,
        };
    })();
  };
  const gestureHandler = Gesture.Simultaneous(
    Gesture.LongPress()
      .onStart(() => {
        isActive.value = withTiming(1, { duration: 500 });
        runOnJS(setLayout)();
        runOnJS(setOpenModal)(true);
      })
      .onEnd(() => {
        isActive.value = withTiming(0, { duration: 500 });
      }),
    Gesture.Pan()
      .manualActivation(true)
      .onTouchesMove((e, state) => {
        if (isActive.value === 0) {
          state.fail();
        }
      })
      .onUpdate(({ absoluteX }) => {
        stickerIndex.value = Math.floor(absoluteX / 40);
      })
      .onEnd(() => {
        runOnJS(setOpenModal)(false);
      })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isActive.value,
      [0, 1],
      [colors.background, colors.secondaryBackground]
    ),
    borderRadius: 8,
  }));

  useEffect(() => {
    setLayout();
  }, [item, ref]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View ref={ref} style={[styles.messageContainer, animatedStyle]}>
        <MarkdownTextInput
          style={{ width: '100%', color: colors.text }}
          multiline
          pointerEvents="none"
          scrollEnabled={false}
          markdownStyle={markdownStyle}
          editable={false}>
          {item.message}
        </MarkdownTextInput>
        <Separator />
        <Text fontSize={12} style={{ opacity: 0.4 }} textAlign="right">
          {humanizeDate(new Date(item.createdAt))}{' '}
          {moment(new Date(item.createdAt)).format('hh:mm A')}
        </Text>
        <Text>{reactions[stickerIndex.value]}</Text>
        <ReactionModal
          position={layout}
          visible={openModal}
          activeIndex={stickerIndex}
          onRequestClose={() => {
            setOpenModal(false);
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const ReactionModal: React.FC<{
  visible: boolean;
  position: SharedValue<{ height: number; pageY: number }>;
  activeIndex: SharedValue<number>;
  onRequestClose(): void;
}> = ({ visible, position, onRequestClose, activeIndex }) => {
  const colors = useColors();
  const animatedStickersStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value.pageY - 44 }],
      backgroundColor: colors.secondaryBackground,
    };
  }, [position]);

  const animatedSticketStyle = (index: number) =>
    useAnimatedStyle(() => ({
      backgroundColor:
        activeIndex.value === index ? colors.pink : 'transparent',
    }));

  const detector = useMemo(
    () => Gesture.Tap().onEnd(runOnJS(onRequestClose)),
    []
  );
  return (
    <Modal
      onRequestClose={onRequestClose}
      transparent
      visible={visible}
      animationType="fade">
      <GestureDetector gesture={detector}>
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.blur }]}
        />
      </GestureDetector>

      <View style={styles.wrapper}>
        <Animated.View style={[animatedStickersStyle, styles.stickersList]}>
          {reactions.map((item, index) => {
            return (
              <Animated.View
                style={[styles.stickerContainer, animatedSticketStyle(index)]}>
                <Text fontSize={24}>{item}</Text>
              </Animated.View>
            );
          })}
        </Animated.View>
      </View>
    </Modal>
  );
};
