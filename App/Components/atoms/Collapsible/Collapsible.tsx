import React, { forwardRef, useImperativeHandle, ForwardedRef, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
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
  children: React.ReactElement | React.ReactElement[] | any;
  ref?: ForwardedRef<CollapsibleRef>;
  expanded?: boolean;
  animatedValue?: SharedValue<number>;
};

export const Collapsible: React.FC<CollapsibleProps> = forwardRef(
  ({ children, expanded = false, animatedValue = useSharedValue(0) }, ref) => {
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
        open.value = false;
      },
      expand: () => {
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
      display: height.value > 0 ? 'none' : 'flex',
    }));

    useEffect(() => {
      open.value = expanded;
    }, [expanded, contentRef.current]);

    useEffect(() => {
      height.value = 0;
      open.value = false;
    }, []);

    return (
      <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
        {expanded ? (
          <Animated.View
            onLayout={({
              nativeEvent: {
                layout: { height: h },
              },
            }) => {
              if (height.value === 0) height.value = h;
            }}
            style={animatedAbsolute}
            ref={contentRef}>
            {children}
          </Animated.View>
        ) : null}
        {expanded ? <View>{children}</View> : null}
      </Animated.View>
    );
  }
);
