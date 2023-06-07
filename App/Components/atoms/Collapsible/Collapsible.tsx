import React from 'react';
import Animated, { CurvedTransition, Easing, SharedValue } from 'react-native-reanimated';

type CollapsibleProps = {
  children: React.ReactElement | React.ReactElement[] | any;
  expanded?: boolean;
  animatedValue?: SharedValue<number>;
};

export const Collapsible: React.FC<CollapsibleProps> = ({ children, expanded = false }) => {
  return (
    <Animated.View layout={CurvedTransition.easingY(Easing.linear).duration(1000)}>
      {expanded ? children : null}
    </Animated.View>
  );
};
