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
import { MainNavigationStackList } from './types';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';

const Tab = createBottomTabNavigator<MainNavigationStackList>();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
};

export const HomeBottomNavigation = () => {
  const { id } = useSelector(AuthSelector);
  return (
    <GradientLayout>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={screenOptions}>
        <Tab.Screen name="Chat" component={HomeChatScreen} />
        <Tab.Screen name="Calendar" component={HomeScreen} />
        {/* @ts-ignore */}
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{ id }}
        />
      </Tab.Navigator>
    </GradientLayout>
  );
};

export default HomeBottomNavigation;
