import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { UserChat } from '../../types';
import { useRealmUsers } from '../Database/Hooks/useRealmUsers';
import useChatEvents from './useChatEvents';

export const useConnectedUsers = () => {
  const { access_token } = useSelector(AuthSelector);
  const [connectedUsers, setConnectedUsers] = useState<Map<string, UserChat>>(
    new Map()
  );
  const { getUser } = useRealmUsers();

  const onDirectMessage = () => {};

  const onUserTyping = (data: { user_id: string }) => {
    const localUser = getUser({
      user_id: data.user_id,
      name: '',
      avatar: '',
      isActive: false,
      unreadCount: 0,
      status: '',
      id: '',
    });
    if (localUser && localUser?.status !== 'TYPING') {
    }
  };
  const onUserStoppedTyping = (data: { user_id: string }) => {
    const localUser = getUser({
      user_id: data.user_id,
      name: '',
      avatar: '',
      isActive: false,
      unreadCount: 0,
      status: '',
      id: '',
    });
    if (localUser && localUser?.status === 'TYPING') {
    }
  };

  useChatEvents({ onDirectMessage, onUserStoppedTyping, onUserTyping }, [
    access_token,
  ]);

  return {
    connectedUsers,
    setConnectedUsers,
  };
};
