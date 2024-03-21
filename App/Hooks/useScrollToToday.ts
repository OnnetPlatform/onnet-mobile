import {
  EventArg,
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';

export type Args = () => void;
export function useScrollToToday(callback: Args) {
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {
    let tabNavigations: NavigationProp<ReactNavigation.RootParamList>[] = [];
    let currentNavigation = navigation;

    while (currentNavigation) {
      if (currentNavigation.getState().type === 'tab') {
        tabNavigations.push(currentNavigation);
      }

      currentNavigation = currentNavigation.getParent();
    }

    if (tabNavigations.length === 0) {
      return;
    }

    const unsubscribers = tabNavigations.map((tab) => {
      return tab.addListener(
        // @ts-expect-error
        'tabPress',
        (e: EventArg<'tabPress', true>) => {
          const isFocused = navigation.isFocused();

          const isFirst =
            tabNavigations.includes(navigation) ||
            navigation.getState().routes[0].key === route.key;

          requestAnimationFrame(() => {
            if (isFocused && isFirst && !e.defaultPrevented) {
              callback();
            }
          });
        }
      );
    });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [navigation, route.key]);
}
