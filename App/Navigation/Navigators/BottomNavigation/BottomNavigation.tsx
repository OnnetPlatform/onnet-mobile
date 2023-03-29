import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../../Screens/HomeScreen';
import { LaunchScreen } from '../../../Screens';
import TabBar from './TabBar';
import { ChatStack } from '../Stacks/ChatStack/ChatStack';

const Tab = createBottomTabNavigator();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
};

export const HomeBottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      screenOptions={screenOptions}>
      <Tab.Screen name="HomeChat" component={ChatStack} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="at" component={LaunchScreen} />
      <Tab.Screen name="bell" component={HomeScreen} />
      <Tab.Screen name="person" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default HomeBottomNavigation;
