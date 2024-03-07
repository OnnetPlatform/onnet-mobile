import { GradientLayout } from '@HOCs';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  FeedScreen,
  HomeChatScreen,
  HomeScreen,
  NotificationScreen,
  ProfileScreen,
} from '@Screens';
import React from 'react';

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
        <Tab.Screen name="HomeChat" component={HomeChatScreen} />
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="home" component={FeedScreen} />
        <Tab.Screen name="bell" component={NotificationScreen} />
        <Tab.Screen name="person" component={ProfileScreen} />
      </Tab.Navigator>
    </GradientLayout>
  );
};

export default HomeBottomNavigation;
