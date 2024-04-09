import { Loader } from '@Atoms';
import React, { useState } from 'react';
import { ImageProps } from 'react-native';
import Animated from 'react-native-reanimated';

export const ImageComponent: React.FC<ImageProps> = (props) => {
  const [loaded, setLoaded] = useState<boolean>(true);
  return (
    <>
      <Animated.Image
        {...props}
        onLoadStart={() => setLoaded(false)}
        onLoadEnd={() => setLoaded(true)}
      />
      {loaded ? null : <Loader />}
    </>
  );
};
export default ImageComponent;