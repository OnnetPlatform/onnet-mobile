import {
  Canvas,
  Rect,
  Circle,
  Turbulence,
  useValue,
  runSpring,
  interpolateColors,
  useComputedValue,
} from '@shopify/react-native-skia';
import React, {useEffect} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useColors} from '@Theme';

export const Glassmorphism: React.FC<{
  step: number;
  onAnimationEnd(): void;
}> = ({step, onAnimationEnd}) => {
  const {width, height} = useWindowDimensions();
  const colors = useColors();
  const damping = {damping: 100};
  const blue_circle_radius = useValue<number>(256);
  const yellow_circle_radius = useValue<number>(256);
  const white_circle_radius = useValue(200);
  const yellow_circle_x = useValue(0);
  const yellow_circle_y = useValue(height);

  const white_circle_x = useValue<number>(width);
  const white_circle_y = useValue<number>(height / 2);
  const blue_circle_x = useValue<number>(width);
  const blue_circle_y = useValue<number>(0);

  const octaves = useValue(1);

  const color = useComputedValue(
    () =>
      interpolateColors(
        white_circle_radius.current,
        [0, 200, 300, width],
        [colors.yellow, colors.white, colors.black, colors.white],
      ),
    [white_circle_radius],
  );
  useEffect(() => {
    if (step === 1) {
      runSpring(white_circle_x, {
        from: white_circle_x.current,
        to: width - (step * width) / 2,
      });
      runSpring(octaves, {to: 0});
      runSpring(blue_circle_x, {to: width / 2});
      runSpring(yellow_circle_x, {to: width / 2});
      runSpring(blue_circle_radius, {to: 0});
      runSpring(yellow_circle_radius, {to: 0});
      setTimeout(() => {
        runSpring(white_circle_radius, {to: width * 2}, undefined, () => {
          runSpring(blue_circle_radius, {to: height * 0.7});
          runSpring(yellow_circle_radius, {to: height * 0.7});
          runSpring(white_circle_radius, {to: 0}, {damping: 40});
          onAnimationEnd();
        });
      }, 700);
    } else if (step === 2) {
      runSpring(yellow_circle_radius, {to: height * 2}, damping);
      runSpring(white_circle_radius, {to: 0}, damping);
      runSpring(white_circle_x, {to: 0}, damping);
      runSpring(white_circle_y, {to: 0}, damping);
      runSpring(white_circle_radius, {to: 300}, damping);
      runSpring(white_circle_x, {to: 0}, damping);
      octaves.current = 2;
      onAnimationEnd();
    } else if (step === 3) {
      runSpring(white_circle_y, {to: 0}, damping);
      runSpring(white_circle_x, {to: 0}, damping);
      runSpring(white_circle_radius, {to: width}, damping);

      runSpring(blue_circle_radius, {to: width * 2}, damping);
      runSpring(blue_circle_x, {to: -width / 2}, damping);
      runSpring(blue_circle_y, {to: height / 2}, damping);

      runSpring(yellow_circle_radius, {to: width}, damping);
      runSpring(yellow_circle_x, {to: width}, damping);
      runSpring(yellow_circle_y, {to: height}, damping);
      onAnimationEnd();
    } else {
      runSpring(blue_circle_x, {to: 0});
      runSpring(yellow_circle_x, {to: 0});
      runSpring(blue_circle_radius, {to: 256});
      runSpring(yellow_circle_radius, {to: 256});
      runSpring(white_circle_radius, {to: 200});
      octaves.current = 1;
    }
  }, [step]);
  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Circle r={2} cx={width - 80} cy={100} color={colors.text} />
      <Circle r={2} cx={70} cy={height / 2} color={colors.text} />
      <Circle
        r={blue_circle_radius}
        cx={blue_circle_x}
        cy={blue_circle_y}
        color={colors.blue}
      />
      <Circle
        r={yellow_circle_radius}
        cx={yellow_circle_x}
        cy={yellow_circle_y}
        color={colors.yellow}
      />
      <Circle
        r={white_circle_radius}
        cx={white_circle_x}
        cy={white_circle_y}
        color={color}
      />

      <Rect x={0} y={0} width={width} height={height}>
        <Turbulence freqX={1} freqY={1} octaves={octaves} seed={2} />
      </Rect>
    </Canvas>
  );
};

export default Glassmorphism;
