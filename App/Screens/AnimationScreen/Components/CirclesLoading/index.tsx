import React, { useEffect, useState } from 'react';
import {
  Canvas,
  Circle,
  useClockValue,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from '../../../../Components/atoms';
const { width, height } = Dimensions.get('screen');

const RADIUS = 6;

export const CirclesLoading: React.FC = () => {
  const [circles, setCircles] = useState<number[]>([1]);

  return (
    <>
      <Text>{circles.length}</Text>
      <Canvas style={StyleSheet.absoluteFillObject}>
        {circles.map((item, index) => (
          <AnimatedCircle key={index} index={item + 1} />
        ))}
      </Canvas>
    </>
  );
};

const AnimatedCircle: React.FC<{ index: number }> = ({ index }) => {
  const clock = useClockValue();
  const thetaValue = useComputedValue(() => clock.current * 0.005, [clock]);
  const commLocation = useComputedValue(() => clock.current / 500, [clock]);

  const cx = useComputedValue(
    () => width / 2 + Math.sin(thetaValue.current) * commLocation.current,
    [clock, commLocation]
  );

  const cy = useComputedValue(
    () => height / 2 + Math.cos(thetaValue.current) * commLocation.current,
    [clock, commLocation]
  );

  return <Circle r={RADIUS} cx={cx} cy={cy} color={'white'} />;
};
