import {
  Circle,
  useClockValue,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {interpolateColor} from 'react-native-reanimated';
import {blue, cyan, pink} from '@Theme/Colors';

export const Moon: React.FC<{}> = () => {
  const r = 120;
  const clock = useClockValue();
  const theta = useValue(0);
  const {width, height} = useWindowDimensions();
  const color = useValue(blue);
  const x = useComputedValue(() => {
    theta.current = theta.current + Math.PI / 100;
    const value = r * Math.sin(theta.current) + width / 2;

    return value;
  }, [clock]);

  // y =  364 - 586
  // 466

  const y = useComputedValue(() => {
    const value = r * Math.sin(theta.current) + height / 2;
    const isIncreasing = value < y?.current;
    if (value < height / 2 + 75) {
      color.current = blue;
    } else {
      color.current = pink;
    }
    return value;
  }, [clock]);

  return (
    <>
      <Circle r={10} cx={x} cy={y} color={color} />
    </>
  );
};

export default Moon;
