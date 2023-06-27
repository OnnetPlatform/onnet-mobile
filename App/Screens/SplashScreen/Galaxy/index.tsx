import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useColors } from '../../../Theme';
import LinearGradient from 'react-native-linear-gradient';
import { Planet, planets } from './data';
import styles from './Galaxy.styles';
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Galaxy: React.FC = () => {
  const skewX = useSharedValue(40);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: interpolate(skewX.value, [0, 40], [0.6, 0.5]),
        },
        { skewX: `${skewX.value}deg` },
      ],
    }),
    []
  );

  useEffect(() => {
    skewX.value = withRepeat(withTiming(20, { duration: 20000, easing: Easing.linear }), -1, true);
  }, []);

  return (
    <SafeAreaView style={[StyleSheet.absoluteFillObject, styles.center]}>
      <Animated.View style={[styles.center, styles.scale8, animatedStyle]}>
        {planets.map((item) => (
          <UFO skewX={skewX} planet={item} key={item.index} />
        ))}
      </Animated.View>
    </SafeAreaView>
  );
};

const UFO: React.FC<{ planet: Planet; skewX: SharedValue<number> }> = ({ planet, skewX }) => {
  const clock = useSharedValue(0);
  const { width } = useWindowDimensions();
  const r = (planet.index * width) / planets.length;
  const rotate = useSharedValue(0);
  const colors = useColors();
  useAnimatedReaction(
    () => skewX.value,
    (value) => (rotate.value = value)
  );
  const animatedStyle = useAnimatedStyle(() => {
    const zIndex =
      planet.index === 0
        ? 10
        : interpolate(Math.sin(clock.value) * r, [0, 360], [planet.index * 10, -planet.index * 10]);

    return {
      width: Math.min(planet.radius, 100),
      height: Math.min(planet.radius, 100),
      borderRadius: Math.min(planet.radius, 100),
      backgroundColor: colors.text,
      position: 'absolute',
      zIndex,
      transform: [
        {
          translateX: Math.sin(clock.value) * r,
        },
        {
          translateY: Math.cos(clock.value) * r,
        },
        { skewX: `-${rotate.value}deg` },
        { scale: interpolate(Math.sin(clock.value) * r, [0, 360], [1, 0.5]) },
        { rotateZ: Math.sin(clock.value) * r + 'deg' },
      ],
    };
  }, []);

  useEffect(() => {
    clock.value = 0;
    clock.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 100 * planet.radius, easing: Easing.linear }),
      -1,
      false
    );
  }, [planet.index]);

  return (
    <>
      {planet.index === 0 ? null : <Orbit radius={r} />}
      <AnimatedLinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={planet.colors}
        style={animatedStyle}></AnimatedLinearGradient>
    </>
  );
};
const Orbit: React.FC<{ radius: number }> = ({ radius }) => {
  const colors = useColors();
  const style: ViewStyle = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderWidth: 2,
    borderColor: colors.text,
    position: 'absolute',
    zIndex: -100,
    opacity: 0.15,
  };
  return <Animated.View style={style} />;
};
