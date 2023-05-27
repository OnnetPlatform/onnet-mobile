import {
  Canvas,
  Fill,
  Group,
  Skia,
  useFont,
  vec,
  TextPath,
  Text,
  useComputedValue,
  Line,
  useSpring,
  DiscretePathEffect,
  useClockValue,
} from '@shopify/react-native-skia';
import React, { useEffect, useState } from 'react';
import Animated, {
  Easing,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const NUMBER_OF_HOURS = 12;
const WIDTH = 256;
const HEIGHT = 256;
const SECOND_HANDLE_SIZE = 0.09;

const R = WIDTH / 2;
function degreesToRadians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
export const Watch: React.FC = () => {
  const seconds = useSharedValue<number>(0);
  const clock = useClockValue();
  const size = 7 * 12;
  const path = Skia.Path.Make();
  path.addCircle(size, size, size / 2);
  const font = useFont(require('./Rubik-Black.ttf'), 24);

  const secondsRotation = useComputedValue(
    () => [{ rotate: (clock.current % 1000) / 1000 }],
    [clock]
  );

  useEffect(() => {
    seconds.value = new Date().getSeconds();
    seconds.value = withRepeat(withTiming(60, { duration: 60000, easing: Easing.linear }), -1);
  }, []);

  return (
    <Canvas style={{ height: R * 2, width: R * 2, borderRadius: R, overflow: 'hidden' }}>
      <Fill color="white" />
      <Group origin={{ x: R, y: R }} transform={secondsRotation}>
        <Line
          p1={vec(R, R)}
          p2={vec(R, R * SECOND_HANDLE_SIZE)}
          color="gray"
          style="stroke"
          strokeWidth={4}
        />
      </Group>
      <Group origin={{ x: R, y: R }} transform={[{ scale: 0.85 }]}>
        {new Array(NUMBER_OF_HOURS).fill(0).map((_, index) => {
          const dx = R * -0.06;
          const dy = R * 0.08;
          const angle = Math.PI / -2 + (2 * index * Math.PI) / 12;
          const x = R * Math.cos(angle) + (R + dx);
          const y = R * Math.sin(angle) + (R + dy);
          return (
            <Text
              font={font}
              y={y}
              x={x}
              text={`${index === 0 ? '12' : index}`}
              color="black"
              key={index}
            />
          );
        })}
      </Group>
    </Canvas>
  );
};
