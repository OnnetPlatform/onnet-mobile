import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from '../../Components/atoms';
import { GradientLayout } from '../../Components/HOCs';
import { Button, Input } from '../../Components/molecules';
import AppLogo from '../../Components/Skia/AppLogo/AppLogo';

export const LoginScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <GradientLayout>
      <SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <AppLogo />
          <Text>Use your phone number to login</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 22,
            flex: 1,

            justifyContent: 'space-between',
          }}>
          <View style={{ width: '100%' }}>
            <Input placeholder="Phone number" keyboardType={'name-phone-pad'} />
            <View style={{ height: 8 }} />
            <Input placeholder="Password" secureTextEntry />
          </View>
          <Button onPress={() => navigation.navigate('HomeScreen')} style={{ alignSelf: 'center' }}>
            <Text>Login</Text>
          </Button>
        </View>
      </SafeAreaView>
    </GradientLayout>
  );
};

export default LoginScreen;
