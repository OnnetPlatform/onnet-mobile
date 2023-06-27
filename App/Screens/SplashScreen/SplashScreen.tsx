import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import LogoLoading from './LogoLoading/LogoLoading';
import { useNavigation } from '@react-navigation/native';
import { Timer } from './Timer';

export const SplashScreen: React.FC = () => {
  const size = 256;
  const r = size * 0.33;
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate('MainNavigation');
    }, 4000);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1,
      }}>
      <Timer />
    </SafeAreaView>
  );
};

export default SplashScreen;
