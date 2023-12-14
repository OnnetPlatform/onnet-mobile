import { Separator, Text } from '@Atoms';
import { GradientLayout } from '@HOCs';
import { AuthCreators } from '@Khayat/Redux';
import { Credentials } from '@Khayat/Redux/Reducers/AuthReducer/types';
import { Button, Input } from '@Molecules';
import AppLogo from '@Skia/AppLogo';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';

export const RegisterationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<Credentials>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const onFirstNameChange = (text: string) =>
    setCredentials((cred) => ({ ...cred, first_name: text }));

  const onLastNameChange = (text: string) =>
    setCredentials((cred) => ({ ...cred, last_name: text }));

  const onEmailChange = (text: string) =>
    setCredentials((cred) => ({ ...cred, email: text }));

  const onPasswordChange = (text: string) =>
    setCredentials((cred) => ({ ...cred, password: text }));

  const onSubmit = () => {
    dispatch(AuthCreators.register(credentials));
  };
  return (
    <GradientLayout>
      <SafeAreaView style={styles.screen}>
        <View style={styles.section}>
          <View style={styles.appLogo}>
            <AppLogo />
            <Separator />
            <Text style={styles.textCenter} weight="light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque neque mi, ere cubilia curae; Aliquam ut commodo urna.
            </Text>
            <Separator />
          </View>
          <View style={styles.w100}>
            <View style={styles.inputs}>
              <Input
                onChangeText={onFirstNameChange}
                style={styles.flex1}
                placeholder="First name"
              />
              <Separator horizontal />
              <Input
                onChangeText={onLastNameChange}
                style={styles.flex1}
                placeholder="Last name"
              />
            </View>
            <Separator />
            <View style={styles.w100}>
              <Input onChangeText={onEmailChange} placeholder="Email" />
              <Separator />
              <Input onChangeText={onPasswordChange} placeholder="Password" />
            </View>
          </View>
          <Button onPress={onSubmit}>
            <Text>Register</Text>
          </Button>
        </View>
      </SafeAreaView>
    </GradientLayout>
  );
};

export default RegisterationScreen;
