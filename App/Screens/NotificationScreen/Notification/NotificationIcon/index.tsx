import React from 'react';
import { Notification, NotificationTypes } from '../../data';
import { Icon, Text } from '../../../../Components/atoms';
export const NotificationIcon: React.FC<{ notification: Notification }> = ({ notification }) => {
  switch (notification.type) {
    case NotificationTypes.EVENT_SCHEDULED:
      return <Icon name={'calendar-outline'} />;
    default:
      return <Text fontSize={24}>{notification.data.emoji}</Text>;
  }
};
