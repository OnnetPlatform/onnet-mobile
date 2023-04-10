import React, { useEffect } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from '../../atoms';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useColors } from '../../../Theme';
import styles from './AppLogo.styles';
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AppLogo: React.FC<{}> = () => {
  const colors = useColors();
  const sharedValue = useSharedValue(0);

  const animatedProps = useAnimatedProps(
    () => ({
      colors: [
        interpolateColor(sharedValue.value, [-200, -150], [colors.cyan, 'purple']),
        interpolateColor(sharedValue.value, [-150, -100], ['purple', colors.pink]),
        interpolateColor(sharedValue.value, [-100, -50], [colors.pink, colors.yellow]),
      ],
    }),
    [sharedValue]
  );

  const startAnimation = () => {
    return (sharedValue.value = withTiming(
      0,
      { duration: 5000, easing: Easing.linear },
      (isFinished) => {
        if (isFinished) {
          sharedValue.value = withTiming(
            -200,
            { duration: 5000, easing: Easing.linear },
            (isFinished) => {
              if (isFinished) {
                sharedValue.value = withTiming(0, { duration: 5000, easing: Easing.linear }, () => {
                  runOnJS(startAnimation)();
                });
              }
            }
          );
        }
      }
    ));
  };
  useEffect(() => {
    withRepeat(startAnimation(), -1, true);
  }, []);
  return (
    <MaskedView
      maskElement={
        <Text weight="black" style={styles.logo} fontSize={40}>
          ONNET
        </Text>
      }>
      <AnimatedLinearGradient
        colors={[]}
        animatedProps={animatedProps}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ width: 200, height: 50 }}
      />
    </MaskedView>
  );
};

export default AppLogo;
