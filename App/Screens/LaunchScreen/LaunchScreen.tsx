import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from '../../Components/atoms';
import { GradientLayout } from '../../Components/HOCs';
import { Button } from '../../Components/molecules';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';
import styles from './LaunchScreen.styles';

const LaunchScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <GradientLayout>
      <>
        <SafeAreaView style={styles.screen}>
          <AppLogo />
          <Text fontSize={14} weight={'regular'}>
            SCHEDULE, MEET, CONNECT
          </Text>
        </SafeAreaView>
        <SafeAreaView style={[styles.screen, styles.contentBetween]}>
          <View />
          <Button
            onPress={() => {
              // @ts-ignore
              navigation.navigate('LoginScreen');
            }}>
            LOGIN
          </Button>
          <Text fontSize={12} weight={'bold'} style={styles.hint}>
            By registring, you accept terms and conditions
          </Text>
        </SafeAreaView>
      </>
    </GradientLayout>
  );
};

export default LaunchScreen;
