import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  FeedScreen,
  NotificationScreen,
  ProfileScreen,
  HomeScreen,
} from '@Screens';
import TabBar from './TabBar';
import {ChatStack} from '../Stacks/ChatStack/ChatStack';
import {GradientLayout} from '@HOCs';

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
        tabBar={props => <TabBar {...props} />}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
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
