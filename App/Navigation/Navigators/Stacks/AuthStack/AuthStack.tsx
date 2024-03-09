import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AudioScreen,
  AuthenticationScreen,
  CustomScreen,
  EventScreen,
  LaunchScreen,
  LoginScreen,
  ProfileScreen,
  RegisterationScreen,
  SplashScreen,
  UserChatScreen,
  VideoRoom,
} from '@Screens';
import { CreateAnnouncement, LiveAnnouncement } from '@Screens/Announcement';
import MediaRecording from '@Screens/Announcement/MediaRecording';
import React from 'react';
import { useSelector } from 'react-redux';

import HomeBottomNavigation from '../../BottomNavigation/BottomNavigation';
import CreateEventNavigation from '../../CreateEventNavigation';
import SettingsNavigator from '../SettingsNavigator';
import { AppNavigationParamsList } from './types';

const Stack = createNativeStackNavigator<AppNavigationParamsList>();

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
          <Stack.Screen name="AudioScreen" component={AudioScreen} />
          <Stack.Screen name="MediaRecorder" component={MediaRecording} />
          <Stack.Screen name="UserChatScreen" component={UserChatScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsNavigator} />
          <Stack.Screen name="EventScreen" component={EventScreen} />

          {/* @ts-ignore */}
          <Stack.Screen name="CustomScreen" component={CustomScreen} />
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
            }}>
            <Stack.Screen
              name={'EventInfo'}
              component={CreateEventNavigation}
            />
          </Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CreateAnnouncement"
            component={CreateAnnouncement}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="LiveAnnouncement"
            component={LiveAnnouncement}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="AuthenticationScreen"
            component={AuthenticationScreen}
          />
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
