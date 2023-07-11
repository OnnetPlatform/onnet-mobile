import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { GradientCard } from '../../Components/Skia/GradientCard/GradientCard';

import { Polyrhythms } from '../../Components/Skia/Polyrhythms/Polyrhythms';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    setTimeout(() => {
      if (isFocused) {
        //  @ts-ignore
        navigation.navigate('MainNavigation');
      }
    }, 1000);
  }, [isFocused]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GradientCard />
      {/* <LogoLoading /> */}
      <Polyrhythms />
    </SafeAreaView>
  );
};

export default SplashScreen;
