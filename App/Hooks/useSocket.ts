import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { UserChat } from '../../types';
import { useQueue } from './useQueue';

const defaulUser: UserChat = {
  name: '',
  avatar: '',
  isActive: false,
  id: '',
  unreadCount: 0,
  status: '',
  user_id: '',
};

export const useSocket = () => {
  const { access_token } = useSelector(AuthSelector);

  const [currentUser] = useState<UserChat>(defaulUser);
  const { sendQueue } = useQueue();
  const [opponent, setOpponent] = useState<UserChat | undefined>();
  const [connected] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser && sendQueue && access_token) {
      sendQueue();
    }
  }, [currentUser, sendQueue, access_token]);

  return { socket: {}, currentUser, setOpponent, opponent, connected };
};
