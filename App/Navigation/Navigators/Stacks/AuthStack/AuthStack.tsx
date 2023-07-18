import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LaunchScreen, LoginScreen } from '../../../../Screens';
import HomeBottomNavigation from '../../BottomNavigation/BottomNavigation';
import SplashScreen from '../../../../Screens/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
        name="MainNavigation"
        component={HomeBottomNavigation}
      />
      <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
