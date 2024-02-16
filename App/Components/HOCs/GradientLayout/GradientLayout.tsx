import React from 'react';
import { GradientLayoutProps } from './types';
import { Blob } from '@Skia/Blob/Blob';
import { StatusBar } from 'react-native';

const GradientLayout: React.FC<GradientLayoutProps> = ({ children }) => {
  return (
    <>
      <StatusBar barStyle={'default'} />
      <Blob />
      {children}
    </>
  );
};

export default GradientLayout;
