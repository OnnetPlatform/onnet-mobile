import { Collapsible } from '@Atoms';
import { AuthCreators } from '@Khayat/Redux';
import { LoginCredentials } from '@Khayat/Redux/Reducers/AuthReducer/types';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon, Separator, Text } from '../../Components/atoms';
import { GradientLayout, KeyboardAvoidingView } from '../../Components/HOCs';
import { Button, Input } from '../../Components/molecules';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';
import { useColors } from '../../Theme';
import styles, { withColors } from './LoginScreen.style';

export const LoginScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const colors = useColors();
  const coloredSyles = withColors(colors);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const onLogin = () => {
    dispatch(AuthCreators.login(credentials));
  };
  return (
    <GradientLayout>
      <SafeAreaView style={[styles.screen]}>
        <View style={styles.titleWrapper}>
          <AppLogo />
          <Text style={styles.subtitle} weight="light">
            Continue with the Google account or email address you use to sign
            in.
          </Text>
        </View>
        <KeyboardAvoidingView style={styles.inputsWrapper}>
          <View style={coloredSyles.googleButton}>
            <Icon name={'google-outline'} />
            <Text weight={'semibold'} fontSize={18} style={styles.mleft}>
              Continue with Google
            </Text>
          </View>
          <Text weight="bold" style={styles.mvertical}>
            OR
          </Text>
          <View style={styles.w100}>
            <Input
              onChangeText={(text) =>
                setCredentials((cred) => ({ ...cred, email: text }))
              }
              style={styles.mbottom}
              placeholder="Email"
              keyboardType={'email-address'}
            />
            <Collapsible expanded={!!credentials.email}>
              <Input
                onChangeText={(text) =>
                  setCredentials((cred) => ({ ...cred, password: text }))
                }
                style={styles.mbottom}
                placeholder="Password"
                keyboardType={'email-address'}
              />
            </Collapsible>
          </View>
          <Button onPress={onLogin} style={styles.cta}>
            <Text>Continue with Email</Text>
          </Button>
          <Separator />
          <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('RegisterationScreen')}>
            <Text weight="semibold">Register</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientLayout>
  );
};

export default LoginScreen;
