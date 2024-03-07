import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CustomScreen,
  HomeChatScreen,
  ProfileScreen,
  UserChatScreen,
} from '@Screens';
import React from 'react';
import SettingsNavigator from '../SettingsNavigator';
import { ChatStackParamList } from './types';

const Stack = createNativeStackNavigator<ChatStackParamList>();

/**
 * @deprecated
 * @purpose
 *  The main prupose of this Mavigator was create a modulariozed navigators for the bottom home tab bar (index = 0)
 * @reason_of_deprecation
 * Performance leaks
 */
export const ChatStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'HomeChatScreen'} component={HomeChatScreen} />
      <Stack.Screen name={'UserChatScreen'} component={UserChatScreen} />
      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
      <Stack.Screen name={'Settings'} component={SettingsNavigator} />
      <Stack.Screen name={'CustomScreen'} component={CustomScreen} />
    </Stack.Navigator>
  );
};
