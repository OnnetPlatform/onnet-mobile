import { useMemo } from 'react';

export const useTabs = () =>
  useMemo(
    () => [
      {
        label: 'DMs',
        icon: 'paper-plane',
      },
      {
        label: 'Calendar',
        icon: 'calendar',
      },
      {
        label: 'Mentions',
        icon: 'at',
      },
      {
        label: 'Notifications',
        icon: 'bell',
      },
      {
        label: 'Profile',
        icon: 'person',
      },
    ],
    []
  );
export default useTabs;
