//  @ts-nocheck
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { GradientCard } from '../../Components/Skia/GradientCard/GradientCard';
import { Polyrhythms } from '../../Components/Skia/Polyrhythms/Polyrhythms';

export const SplashScreen: React.FC = () => {
  const { access_token } = useSelector(AuthSelector);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      if (isFocused) {
        if (access_token) {
          navigation.navigate('MainNavigation');
        } else {
          navigation.navigate('LoginScreen');
        }
      }
    }, 2000);
  }, [isFocused, access_token]);

  return (
    <SafeAreaView style={styles.screen}>
      <GradientCard />
      <Polyrhythms />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
  },
});

export default SplashScreen;
