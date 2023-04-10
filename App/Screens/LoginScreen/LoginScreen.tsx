import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Icon, Text } from '../../Components/atoms';
import { KeyboardAvoidingView } from '../../Components/HOCs';
import { Button, Input } from '../../Components/molecules';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';
import styles, { withColors } from './LoginScreen.style';
import { useColors } from '../../Theme';

export const LoginScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const colors = useColors();
  const coloredSyles = withColors(colors);
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView style={styles.titleWrapper}>
        <AppLogo />
        <Text style={styles.subtitle} weight="light">
          Continue with the Google account or email address you use to sign in.
        </Text>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.inputsWrapper}>
        <View style={coloredSyles.googleButton}>
          <Icon name={'google-outline'} />
          <Text weight={'semibold'} fontSize={18} style={{ marginLeft: 8 }}>
            Continue with Google
          </Text>
        </View>
        <Text weight="bold" style={{ marginVertical: 22 }}>
          OR
        </Text>
        <View style={{ width: '100%' }}>
          <Input style={{ marginBottom: 22 }} placeholder="Email" keyboardType={'email-address'} />
        </View>
        <Button
          // @ts-ignore
          onPress={() => navigation.navigate('MainNavigation')}
          style={{ alignSelf: 'center' }}>
          <Text>Continue with Email</Text>
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
