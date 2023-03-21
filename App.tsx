import { useEffect, useMemo } from 'react';
import { LogBox, View, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreAllLogs();
import { MainNavigator } from './App/Navigation';
import HomeScreen from './App/Screens/HomeScreen';
import { useColors } from './App/Theme';

export const Warda = () => {
  const rotate = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: -rotate.value + 'deg' }],
  }));

  return (
    <Animated.View
      style={[
        { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
        animatedStyle,
      ]}>
      {Array.from({ length: 72 }, (_, i) => i).map((_, index) => {
        return <AnimatedBlade key={index} index={index} />;
      })}
    </Animated.View>
  );
};

const AnimatedBlade = ({ index }: any) => {
  const colors = useColors();
  const offset = index * 5 + 1;
  const sharedValue = useSharedValue(offset);
  const start = () => {
    sharedValue.value = withRepeat(
      withTiming(360 + offset, { duration: offset * 10, easing: Easing.linear }),
      -1
    );
  };

  useEffect(() => {
    sharedValue.value = offset / 2;
    sharedValue.value = withTiming(offset, { duration: 100 }, (finished) => {
      if (finished) runOnJS(start)();
    });
    start();

    return () => cancelAnimation(sharedValue);
  }, [index]);

  const rotate = useAnimatedStyle(() => ({
    transform: [{ rotateZ: sharedValue.value + 'deg' }, { scale: 0.1 }],
    backgroundColor: interpolateColor(
      sharedValue.value,
      [offset + 90, offset + 180, offset + 270, offset + 360, offset + 360],
      [colors.pink, colors.blue, colors.cyan, colors.yellow, '#30D5C8']
    ),
    opacity: 0.6,
  }));

  return (
    <Animated.View
      style={[
        {
          width: 12,
          borderRadius: 6,
          height: index * 5,
          position: 'absolute',
          alignSelf: 'center',
          zIndex: -index,
        },
        rotate,
      ]}
    />
  );
};

const Earth = () => {
  const rotateX = useSharedValue(0);
  useEffect(() => {
    rotateX.value = 0;
    rotateX.value = withRepeat(
      withTiming(720, { duration: 5000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateX: '30deg',
        },
        {
          rotateY: '30deg',
        },
        {
          skewX: '30deg',
        },
        {
          skewY: '30deg',
        },
        { rotate: rotateX.value + 'deg' },
      ],
    }),
    [rotateX.value]
  );
  return (
    <SafeAreaView style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            width: 200,
            height: 200,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: '#fff',
            justifyContent: 'center',
          },
          animatedStyle,
        ]}>
        <Animated.View
          style={[
            {
              width: 12,
              height: 12,
              backgroundColor: 'red',
              borderRadius: 15,
              marginLeft: -12,
            },
          ]}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            width: 200,
            height: 200,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: '#fff',
            justifyContent: 'center',
            top: -200,
          },
          {
            transform: [
              {
                rotateX: '-30deg',
              },
              {
                rotateY: '-30deg',
              },
              {
                skewX: '-30deg',
              },
              {
                skewY: '-30deg',
              },
              { rotate: rotateX.value + 'deg' },
            ],
          },
        ]}>
        <Animated.View
          style={[
            {
              width: 12,
              height: 12,
              backgroundColor: 'red',
              borderRadius: 15,
              marginLeft: -12,
            },
          ]}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default MainNavigator;
