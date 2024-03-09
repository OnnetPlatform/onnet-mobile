import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppNavigationParamsList } from 'Navigation/Navigators/Stacks/AuthStack/types';

export type FeedScreenProps = BottomTabNavigationProp<
  AppNavigationParamsList,
  'MainNavigation'
>;
