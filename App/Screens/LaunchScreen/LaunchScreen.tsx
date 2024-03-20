import { useColors } from '@Theme';
import React, { useEffect, useState } from 'react';
import { Pressable, StatusBar } from 'react-native';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { Icon } from '../../Components/atoms';
import { Glassmorphism } from '../../Components/Skia';
import styles, { withInsets } from './LaunchScreen.styles';
import { SceneContainer } from './SceneContainer/SceneContainer';
import { useAppNavigation } from '@Hooks/useAppNavigation';

const LaunchScreen: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const insetsStyles = withInsets(insets, colors);
  const [isEnded, setEnded] = useState<boolean>(false);
  const navigation = useAppNavigation();
  const onLoginPressed = () => {
    setStep(1);
    navigation.navigate('AuthenticationScreen');
  };
  useEffect(() => {
    console.log(step);
  }, [step]);
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.black }]}>
      <StatusBar barStyle={'light-content'} />
      <Glassmorphism step={step} onAnimationEnd={() => setEnded(true)} />
      <SceneContainer step={step} ready={isEnded} />

      {step === 3 && isEnded ? (
        <Pressable onPress={onLoginPressed} style={insetsStyles.button}>
          <Icon style={styles.icon} name={'checkmark-outline'} />
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
            style={styles.icon}
            name={'arrow-ios-forward-outline'}
          />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default LaunchScreen;
