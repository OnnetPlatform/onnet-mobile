import React from 'react';
import {Gradient} from '../../Skia';
import {GradientLayoutProps} from './types';
const GradientLayout: React.FC<GradientLayoutProps> = ({children}) => {
  return (
    <>
      <Gradient />
      {children}
    </>
  );
};

export default GradientLayout;
