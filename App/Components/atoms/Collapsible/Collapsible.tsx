import React from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
} from 'react-native-reanimated';

type CollapsibleProps = {
  children: React.ReactElement | React.ReactElement[] | any;
  expanded?: boolean;
  animatedValue?: SharedValue<number>;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  expanded = false,
}) => {
  if (expanded) {
    return (
      <Animated.View
        entering={FadeIn.duration(800)}
        exiting={FadeOut.duration(500)}>
        {children}
      </Animated.View>
    );
  }
  return null;
};
export default Collapsible;
