import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, useWindowDimensions } from 'react-native';
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
import { pink, yellow } from '../../../Theme/Colors';
import { Planet, planets } from './data';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Galaxy: React.FC = () => {
  const skewX = useSharedValue(40);
  useEffect(() => {
    skewX.value = withRepeat(withTiming(20, { duration: 20000, easing: Easing.linear }), -1, true);
  }, []);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: interpolate(skewX.value, [0, 40], [1, 0.5]),
        },
        { skewX: `${skewX.value}deg` },
      ],
    }),
    []
  );
  return (
    <SafeAreaView
      style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center' }]}>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale: 0.8 }],
          },
          animatedStyle,
        ]}>
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
    return {
      width: Math.min(planet.radius, 100),
      height: Math.min(planet.radius, 100),
      borderRadius: Math.min(planet.radius, 100),
      backgroundColor: colors.text,
      position: 'absolute',
      zIndex:
        planet.index === 0
          ? 10
          : interpolate(
              Math.sin(clock.value) * r,
              [0, 360],
              [planet.index * 10, -planet.index * 10]
            ),
      transform: [
        {
          translateX: Math.sin(clock.value) * r,
        },
        {
          translateY: Math.cos(clock.value) * r,
        },
        { skewX: `-${rotate.value}deg` },
      ],
    };
  }, []);

  useEffect(() => {
    clock.value = 0;
    clock.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 1000 * planet.radius, easing: Easing.linear }),
      -1,
      false
    );
  }, [planet.index]);
  return (
    <>
      {planet.index === 0 ? null : (
        <Animated.View
          style={[
            {
              width: r * 2,
              height: r * 2,
              borderRadius: r,
              borderWidth: 2,
              borderColor: colors.secondaryBackground,
              position: 'absolute',
              zIndex: -100,
            },
          ]}
        />
      )}
      <AnimatedLinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={planet.colors}
        style={animatedStyle}></AnimatedLinearGradient>
    </>
  );
};
