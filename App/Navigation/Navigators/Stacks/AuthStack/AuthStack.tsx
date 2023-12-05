import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LaunchScreen,
  LoginScreen,
  RegisterationScreen,
  SplashScreen,
  VideoRoom,
} from '@Screens';
import React from 'react';
import { useSelector } from 'react-redux';

import HomeBottomNavigation from '../../BottomNavigation/BottomNavigation';
import CreateEventNavigation from '../../CreateEventNavigation';

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  const { access_token } = useSelector(AuthSelector);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      {access_token ? (
        <>
          <Stack.Screen
            options={{
              contentStyle: {
                backgroundColor: 'transparent',
              },
            }}
            name="MainNavigation"
            component={HomeBottomNavigation}
          />
          <Stack.Screen name="ConferenceScreen" component={VideoRoom} />
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
            }}>
            <Stack.Screen
              name={'EventInfo'}
              component={CreateEventNavigation}
            />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="RegisterationScreen"
            component={RegisterationScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
