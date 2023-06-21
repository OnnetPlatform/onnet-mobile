import React, { useEffect } from 'react';
import {
  Circle,
  Group,
  runTiming,
  useClockValue,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import { useColors } from '../../../Theme';
import { useWindowDimensions } from 'react-native';
import { interpolate } from 'react-native-reanimated';
const data = Array.from({ length: 6 }, (_, i) => i);

export const AnimatedCircle: React.FC = ({}) => {
  const colors = useColors();
  const { width, height } = useWindowDimensions();
  return (
    <Group>
      <Circle r={100} color={colors.cyan} cx={width / 2} cy={height / 2} />
      {data.map((item) => (
        <Moon index={item} key={item} />
      ))}
    </Group>
  );
};

const Moon: React.FC<{ index: number }> = ({ index }) => {
  const x = useValue(0);
  const y = useValue(0);
  const theta = useValue(0);
  const visible = useValue(0);

  const r = 95;
  const clock = useClockValue();
  const { width, height } = useWindowDimensions();
  const cx = useComputedValue(() => {
    // 100:-100
    theta.current = theta.current + Math.PI / 1000;
    const value = r * Math.cos(theta.current);
    x.current = value;
    return value + width / 2;
  }, [clock, width]);

  const cy = useComputedValue(() => {
    theta.current = theta.current + Math.PI / 1000;
    const value = r * Math.cos(theta.current);
    const isDecreasing = value < y.current;
    runTiming(visible, isDecreasing ? 0 : 1, { duration: 400 });
    y.current = value;
    return value + height / 2;
  }, [clock, width]);

  const radius = useComputedValue(() => {
    return interpolate(x.current, [-100, -50, 0, 50, 100], [2, 30, 50, 30, 2]);
  }, [cx]);

  const opacity = useComputedValue(() => {
    return interpolate(Number(visible.current), [1, 0], [1, 0]);
  }, [cx]);

  useEffect(() => {
    clock.stop();

    setTimeout(() => {
      clock.start();
    }, 2000 * index);
  }, [index]);

  return <Circle r={radius} color={'red'} cx={cx} cy={cy} opacity={opacity} />;
};

export default AnimatedCircle;
