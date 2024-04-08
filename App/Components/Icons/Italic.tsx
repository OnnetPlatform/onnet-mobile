import { useColors } from '@Theme/index';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

export const ItalicIcon: React.FC = () => {
  const colors = useColors();
  return (
    <Svg height="18" width="18" viewBox="0 0 24 24">
      <Path
        d="M10 3H20M4 21H14M15 3L9 21"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ItalicIcon;
