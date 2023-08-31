import React, { useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, View } from 'react-native';
import styles, { withInsets } from './LaunchScreen.styles';
import { useColors } from '../../Theme';

import { Glassmorphism } from '../../Components/Skia';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../Components/atoms';
import { Galaxy } from '../SplashScreen/Galaxy';
import { Button } from '../../Components/molecules';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';
import { SceneContainer } from './SceneContainer/SceneContainer';

const LaunchScreen: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const insetsStyles = withInsets(insets, colors);
  const [isEnded, setEnded] = useState<boolean>(false);
  const navigation = useNavigation();
  const onLoginPressed = () => {
    setStep(1);
    // @ts-ignore
    navigation.navigate('LoginScreen');
  };
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.black }]}>
      <StatusBar barStyle={'light-content'} />
      <Glassmorphism step={step} onAnimationEnd={() => setEnded(true)} />
      <SceneContainer step={step} ready={isEnded} />

      {step === 3 && isEnded ? (
        <Pressable onPress={onLoginPressed} style={insetsStyles.button}>
          <Icon style={{ width: 24, height: 24 }} name={'checkmark-outline'} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setStep((s) => Math.min(s + 1, 3));
            setEnded(false);
          }}
          style={insetsStyles.button}>
          <Icon
            fill={'black'}
            style={{ width: 24, height: 24 }}
            name={'arrow-ios-forward-outline'}
          />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default LaunchScreen;
