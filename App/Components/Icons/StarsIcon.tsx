import { useColors } from '@Theme/index';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Path, Svg } from 'react-native-svg';

export const StarsIcon: React.FC = () => {
  const colors = useColors();

  return (
    <MaskedView
      maskElement={
        <Svg viewBox="0 0 1024 1024" width={24} height={24} fill={colors.text}>
          <Path
            d="M602.24 246.72a17.28 17.28 0 0 0-11.84-16.32l-42.88-14.4A90.56 90.56 0 0 1 490.24 160l-14.4-42.88a17.28 17.28 0 0 0-32 0L428.8 160a90.56 90.56 0 0 1-57.28 57.28l-42.88 14.4a17.28 17.28 0 0 0 0 32l42.88 14.4a90.56 90.56 0 0 1 57.28 57.28l14.4 42.88a17.28 17.28 0 0 0 32 0l14.4-42.88a90.56 90.56 0 0 1 57.28-57.28l42.88-14.4a17.28 17.28 0 0 0 12.48-16.96z m301.12 221.76l-48.32-16a101.44 101.44 0 0 1-64-64l-16-48.32a19.2 19.2 0 0 0-36.8 0l-16 48.32a101.44 101.44 0 0 1-64 64l-48.32 16a19.2 19.2 0 0 0 0 36.8l48.32 16a101.44 101.44 0 0 1 64 64l16 48.32a19.2 19.2 0 0 0 36.8 0l16-48.32a101.44 101.44 0 0 1 64-64l48.32-16a19.2 19.2 0 0 0 0-36.8z m-376.64 195.52l-64-20.8a131.84 131.84 0 0 1-83.52-83.52l-20.8-64a25.28 25.28 0 0 0-47.68 0l-20.8 64a131.84 131.84 0 0 1-82.24 83.52l-64 20.8a25.28 25.28 0 0 0 0 47.68l64 20.8a131.84 131.84 0 0 1 83.52 83.84l20.8 64a25.28 25.28 0 0 0 47.68 0l20.8-64a131.84 131.84 0 0 1 83.52-83.52l64-20.8a25.28 25.28 0 0 0 0-47.68z"
            fill={colors.text}
          />
        </Svg>
      }>
      <LinearGradient
        style={{ width: 24, height: 24 }}
        colors={[colors.pink, colors.cyan]}
      />
    </MaskedView>
  );
};
export default StarsIcon;
