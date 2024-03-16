import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type MainNavigationStackList = {
  HomeChat: undefined;
  HomeScreen: undefined;
  home: undefined;
  bell: undefined;
  person: {
    id: string;
  };
};
export type MainNavigationType = BottomTabNavigationProp<{}>;
