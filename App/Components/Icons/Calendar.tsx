import { useColors } from '@Theme';
import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

export const CalendarIcon: React.FC = () => {
  const colors = useColors();
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4V2.5"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M17 4V2.5"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="16.5" cy="16.5" r="2" stroke={colors.text} strokeWidth="2" />
      <Path
        d="M22 9H16.625H10.75M2 9H5.875"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985"
        stroke={colors.text}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CalendarIcon;
