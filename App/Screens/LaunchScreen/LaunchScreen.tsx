import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from '../../Components/atoms';
import { GradientLayout } from '../../Components/HOCs';
import { Button } from '../../Components/molecules';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';
import styles from './LaunchScreen.styles';
import { useColors } from '../../Theme';

const LaunchScreen: React.FC = () => {
  const navigation = useNavigation();
  const colors = useColors();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <GradientLayout>
        <SafeAreaView style={styles.screen}>
          <AppLogo />
          <Text fontSize={14} weight={'regular'}>
            SCHEDULE, MEET, CONNECT
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.screen}>
          <View style={[{ paddingHorizontal: 22, justifyContent: 'center', alignItems: 'center' }]}>
            <Button
              onPress={() =>
                // @ts-ignore
                navigation.navigate('LoginScreen')
              }>
              <Text style={styles.buttonText} weight="bold">
                Join workspace
              </Text>
            </Button>
          </View>
        </SafeAreaView>
      </GradientLayout>
    </SafeAreaView>
  );
};

export default LaunchScreen;
