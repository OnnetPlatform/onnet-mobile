import { useColors } from '@Theme/index';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

export const CodeIcon: React.FC = () => {
  const colors = useColors();
  return (
    <Svg height="24" width="24" viewBox="0 0 24 24" fill={'none'}>
      <Path
        d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CodeIcon;
