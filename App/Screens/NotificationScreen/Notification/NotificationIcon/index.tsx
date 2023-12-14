import { Icon, Text } from '@Atoms';
import React from 'react';

import { Notification, NotificationTypes } from '../../data';

export const NotificationIcon: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  switch (notification.type) {
    case NotificationTypes.EVENT_SCHEDULED:
      return <Icon name={'calendar-outline'} />;
    default:
      return <Text fontSize={24}>{notification.data.emoji}</Text>;
  }
};
