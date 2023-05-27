import React, { forwardRef, ForwardedRef } from 'react';
import Animated, { CurvedTransition, Easing, SharedValue } from 'react-native-reanimated';

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
  ({ children, expanded = false }) => {
    return (
      <Animated.View layout={CurvedTransition.easingY(Easing.linear).duration(1000)}>
        {expanded ? children : null}
      </Animated.View>
    );
  }
);
