import BellIcon from '@Icons/BellIcon';
import CalendarIcon from '@Icons/Calendar';
import FeedIcon from '@Icons/Feed';
import HomeIcon from '@Icons/Home';
import ProfileIcon from '@Icons/Profile';
import React from 'react';
import { useMemo } from 'react';

export const useTabs = () =>
  useMemo(
    () => [
      {
        label: 'DMs',
        icon: <HomeIcon />,
      },
      {
        label: 'Calendar',
        icon: <CalendarIcon />,
      },
      {
        label: 'Feed',
        icon: <FeedIcon />,
      },
      {
        label: 'Notifications',
        icon: <BellIcon />,
      },
      {
        label: 'Profile',
        icon: <ProfileIcon />,
      },
    ],
    []
  );
export default useTabs;
