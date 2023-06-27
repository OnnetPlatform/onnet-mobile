import {
  Canvas,
  useImage,
  Image,
  ColorMatrix,
  useComputedValue,
  BackdropFilter,
  useValue,
  runTiming,
} from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Story } from '../types';
const image =
  'https://images.unsplash.com/photo-1508107222753-0c236c337911?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80';

const BLACK_AND_WHITE = [
  0.21, 0.72, 0.07, 0, 0, 0.21, 0.72, 0.07, 0, 0, 0.21, 0.72, 0.07, 0, 0, 0, 0, 0, 1, 0,
];

export const StoryGallery: React.FC<{
  media:
    | {
        url: string;
        type: 'video' | 'image';
      }
    | undefined;
  currentIndex: number;
}> = ({ media, currentIndex }) => {
  if (currentIndex < 0) return <View />;
  const imageskia = useImage(media?.url);
  const { width, height } = useWindowDimensions();
  const animatedHeight = useValue(height * 0.6);

  const clip = useComputedValue(
    () => ({
      x: 0,
      y: 0,
      width: width,
      height: animatedHeight.current,
    }),
    [animatedHeight]
  );
  useEffect(() => {
    runTiming(animatedHeight, { to: 0 }, { duration: 1000 });
  }, []);
  return (
    <Canvas style={[StyleSheet.absoluteFill]}>
      <Image image={imageskia} x={0} y={0} width={width} height={height * 0.6} fit="cover" />
      <BackdropFilter clip={clip} filter={<ColorMatrix matrix={BLACK_AND_WHITE} />} />
    </Canvas>
  );
};
