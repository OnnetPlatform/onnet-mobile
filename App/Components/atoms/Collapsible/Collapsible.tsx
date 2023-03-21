import React, { forwardRef, useImperativeHandle, ForwardedRef, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  measure,
  runOnUI,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export type CollapsibleRef = {
  collapse(): void;
  expand(): void;
};

type CollapsibleProps = {
  children: React.ReactElement | React.ReactElement[];
  ref?: ForwardedRef<CollapsibleRef>;
  onCollpaseEnd?(): void;
  onExpandEnd?(): void;
  expanded?: boolean;
  animatedValue?: SharedValue<number>;
};

export const Collapsible: React.FC<CollapsibleProps> = forwardRef(
  (
    { children, onCollpaseEnd, onExpandEnd, expanded = false, animatedValue = useSharedValue(0) },
    ref
  ) => {
    const contentRef = useAnimatedRef<Animated.View>();
    const height = useSharedValue(0);
    const open = useSharedValue(false);
    const progress = useDerivedValue(() =>
      open.value ? withSpring(1, { stiffness: 100 }) : withTiming(0, { duration: 100 })
    );

    useAnimatedReaction(
      () => progress.value,
      (progress) => (animatedValue.value = progress)
    );

    useImperativeHandle(ref, () => ({
      collapse: () => {
        measureLayout();
        open.value = false;
      },
      expand: () => {
        measureLayout();
        open.value = true;
      },
    }));

    const animatedStyle = useAnimatedStyle(() => ({
      height: height.value * progress.value + 1,
      display: progress.value === 0 ? 'none' : 'flex',
    }));

    const animatedAbsolute = useAnimatedStyle(() => ({
      position: 'absolute',
      zIndex: -100,
      opacity: 0,
    }));

    const measureLayout = () => {
      runOnUI(() => {
        'worklet';
        const measured = measure(contentRef).height;
        if (measured > 0) height.value = measured;
      })();
    };
    useEffect(() => {
      if (expanded)
        setTimeout(() => {
          measureLayout();
        }, 10);
      open.value = expanded;
    }, [expanded, contentRef.current]);

    useEffect(() => {
      height.value = 0;
      open.value = false;
    }, []);

    return (
      <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
        <Animated.View style={animatedAbsolute} ref={contentRef}>
          {children}
        </Animated.View>
        <View>{children}</View>
      </Animated.View>
    );
  }
);
