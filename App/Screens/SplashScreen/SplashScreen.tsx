import React from 'react';
import { SafeAreaView, StyleSheet, View, useWindowDimensions } from 'react-native';
import {
  BackdropBlur,
  Canvas,
  Drawing,
  FractalNoise,
  Group,
  Rect,
  Skia,
  Vertices,
  vec,
} from '@shopify/react-native-skia';
import { useColors } from '../../Theme';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';
import AnimatedCircle from './AnimatedCricle';
import { Warda } from '../../../App';
import { Galaxy } from './Galaxy';

export const SplashScreen: React.FC = () => {
  const size = 256;
  const r = size * 0.33;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1,
      }}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          zIndex: 100,
          paddingTop: 22,
        }}>
        <AppLogo />
      </View>
      <Galaxy />
    </SafeAreaView>
  );
};

export default SplashScreen;
