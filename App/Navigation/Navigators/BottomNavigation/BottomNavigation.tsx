import { GradientLayout } from '@HOCs';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  FeedScreen,
  HomeScreen,
  NotificationScreen,
  ProfileScreen,
} from '@Screens';
import React from 'react';

import { ChatStack } from '../Stacks/ChatStack/ChatStack';
import TabBar from './TabBar';

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
    <GradientLayout>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={screenOptions}>
        <Tab.Screen name="HomeChat" component={ChatStack} />
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="home" component={FeedScreen} />
        <Tab.Screen name="bell" component={NotificationScreen} />
        <Tab.Screen name="person" component={ProfileScreen} />
      </Tab.Navigator>
    </GradientLayout>
  );
};

export default HomeBottomNavigation;
