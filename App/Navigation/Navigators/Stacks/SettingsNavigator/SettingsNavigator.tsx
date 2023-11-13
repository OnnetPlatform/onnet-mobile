import { SettingsScreen } from '@Screens';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  header: () => null,
};
export const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="MainSettingScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
export default SettingsNavigator;
