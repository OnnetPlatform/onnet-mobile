import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeChatScreen, UserChatScreen, ProfileScreen } from '../../../../Screens';

const Stack = createNativeStackNavigator();

export const ChatStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'HomeChatScreen'} component={HomeChatScreen} />
      <Stack.Screen name={'UserChatScreen'} component={UserChatScreen} />
      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
    </Stack.Navigator>
  );
};
