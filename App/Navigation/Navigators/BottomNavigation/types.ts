import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type MainNavigationStackList = {
  Chat: undefined;
  Calendar: undefined;
  Feed: undefined;
  Notifications: undefined;
  Profile: {
    id: string;
  };
};
export type MainNavigationType = BottomTabNavigationProp<{}>;
