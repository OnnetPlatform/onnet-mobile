import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Polyrhythms } from '../../Components/Skia/Polyrhythms/Polyrhythms';
import Texture from '@Skia/Texture/Texture';

export const SplashScreen: React.FC = () => {
  const { access_token } = useSelector(AuthSelector);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      try {
        if (isFocused) {
          if (access_token) {
            // @ts-ignore
            navigation.navigate('MainNavigation');
          } else {
            // @ts-ignore
            navigation.navigate('AuthenticationScreen');
          }
        }
      } catch (error) {}
    }, 2000);
  }, [isFocused, access_token]);

  return (
    <SafeAreaView style={styles.screen}>
      <Texture />
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
