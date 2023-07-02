import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { GradientCard } from '../../Components/Skia/GradientCard/GradientCard';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';
import { Text } from '../../Components/atoms';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate('MainNavigation');
    }, 1000);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GradientCard />
      <Text
        fontSize={64}
        color="rgba(255,255,255,.4)"
        weight="black"
        style={{
          letterSpacing: 4,
        }}>
        ONNET
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
