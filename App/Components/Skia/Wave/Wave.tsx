import React from 'react';
import {
  Canvas,
  LinearGradient,
  vec,
  Rect,
  Blend,
  useImage,
  Image,
  Mask,
} from '@shopify/react-native-skia';

import { useColors } from '@Theme/index';
import { SharedValue } from 'react-native-reanimated';

export const Wave: React.FC<{
  progress: SharedValue<number>;
  width: number;
  height: number;
  uri: string;
}> = ({ progress, width, height, uri }) => {
  const colors = useColors();
  const image = useImage(uri);

  return (
    <Canvas style={{ width, height, backgroundColor: 'transparent' }}>
      <Mask
        mask={
          <Image
            image={image}
            fit={'fill'}
            height={height}
            width={width}
            color={colors.text}
          />
        }>
        <>
          <Rect width={width} height={height}>
            <Blend mode={'dstIn'}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, width)}
                colors={[colors.text, colors.text]}
              />
              <LinearGradient
                start={vec(4, 0)}
                end={vec(0, 0)}
                colors={[colors.background, 'transparent', colors.background]}
                mode={'repeat'}
              />
            </Blend>
          </Rect>
          <Rect width={progress} height={height}>
            <Blend mode={'dstIn'}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, width)}
                colors={[colors.cyan, colors.pink, colors.pink]}
              />
              <LinearGradient
                start={vec(4, 0)}
                end={vec(0, 0)}
                colors={[colors.background, 'transparent', colors.background]}
                mode={'repeat'}
              />
            </Blend>
          </Rect>
        </>
      </Mask>
    </Canvas>
  );
};
export default Wave;
