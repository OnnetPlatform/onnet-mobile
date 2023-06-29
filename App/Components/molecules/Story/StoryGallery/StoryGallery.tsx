import {
  Canvas,
  useImage,
  Image,
  ColorMatrix,
  useComputedValue,
  BackdropFilter,
  useValue,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import {
  SharedValue,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const BLACK_AND_WHITE = [
  0.21, 0.72, 0.07, 0, 0, 0.21, 0.72, 0.07, 0, 0, 0.21, 0.72, 0.07, 0, 0, 0, 0, 0, 1, 0,
];

export const StoryGallery: React.FC<{
  isFocused: SharedValue<boolean>;
  media:
    | {
        url: string;
        type: 'video' | 'image';
      }
    | undefined;
  currentIndex: number;
}> = ({ media, currentIndex, isFocused }) => {
  if (currentIndex < 0) return <View />;
  const imageskia = useImage(media?.url);
  const { width, height } = useWindowDimensions();
  const focused = useSharedValue(false);

  useAnimatedReaction(
    () => isFocused.value,
    (value) => {
      focused.value = value;
    }
  );
  const animatedHeight = useDerivedValue(
    () => withTiming(focused.value ? 0 : height * 0.6, { duration: 1000 }),
    [focused.value]
  );

  const clip = useDerivedValue(() => {
    return {
      x: 0,
      y: 0,
      width: width,
      height: animatedHeight.value,
    };
  }, [animatedHeight]);

  return (
    <Canvas style={[StyleSheet.absoluteFill]}>
      <Image image={imageskia} x={0} y={0} width={width} height={height * 0.6} fit="cover"></Image>
      <BackdropFilter clip={clip} filter={<ColorMatrix matrix={BLACK_AND_WHITE} />} />
    </Canvas>
  );
};
