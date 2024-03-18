import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppNavigationParamsList } from 'Navigation/Navigators/Stacks/AuthStack/types';

export type AppNavigationProps = BottomTabNavigationProp<
  AppNavigationParamsList,
  'MainNavigation'
>;

export const useAppNavigation = () => useNavigation<AppNavigationProps>();
