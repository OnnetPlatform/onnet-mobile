import { useColors } from '@Theme/index';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

export const PlayIcon: React.FC<{
  width?: number;
  height?: number;
  fill?: string;
}> = ({ width = 24, height = 24, fill }) => {
  const color = useColors();
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        fill={fill || color.text}
        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"
      />
    </Svg>
  );
};

export default PlayIcon;
