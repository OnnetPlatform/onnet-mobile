import { useColors } from '@Theme/index';
import { BackdropBlur, Canvas, Circle, Path } from '@shopify/react-native-skia';
import React from 'react';
import { useWindowDimensions } from 'react-native';

export const RamdanKareem: React.FC = () => {
  const { width } = useWindowDimensions();
  const colors = useColors();
  return (
    <Canvas style={{ height: 200, width, backgroundColor: colors.background }}>
      <Circle cx={width / 2} cy={100} r={50} color={colors.text} />
      <BackdropBlur blur={100} blendMode={'overlay'} />
      <Circle cx={width / 2 - 10} cy={90} r={50} color={colors.background} />

      <Star />
    </Canvas>
  );
};

const Star: React.FC = () => {
  const path = 'm56,237 74-228 74,228L10,96h240';
  const colors = useColors();
  return (
    <Path
      style={'fill'}
      path={path}
      color={colors.yellow}
      transform={[{ scale: 0.1 }, { translateX: 100 }, { translateY: 100 }]}
    />
  );
};
export default RamdanKareem;
