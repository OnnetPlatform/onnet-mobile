import React from 'react';
import { Gradient } from '../../Skia';
import { GradientLayoutProps } from './types';
import { Blob } from '../../Skia/Blob/Blob';
const GradientLayout: React.FC<GradientLayoutProps> = ({ children }) => {
  return (
    <>
      <Blob />
      {children}
    </>
  );
};

export default GradientLayout;
