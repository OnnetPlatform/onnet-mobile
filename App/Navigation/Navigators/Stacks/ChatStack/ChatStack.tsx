import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeChatScreen, UserChatScreen, ProfileScreen, CustomScreen } from '@Screens';
import SettingsNavigator from '../SettingsNavigator';
import { ChatStackParamList } from './types';

const Stack = createNativeStackNavigator<ChatStackParamList>();

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
