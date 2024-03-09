import User from '@Khayat/Database/Models/User';
import { useQuery } from '@realm/react';

export const useUnreadMessages = () => {
  const users = useQuery(User, (collections) =>
    collections.filtered('unreadCount > 0')
  );

  if (users.length > 0) {
  }
};
