import { SectionsList, Separator, Text } from '@Atoms';
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import ChatUser from '../ChatUser/ChatUser';
import EmptyState from './components/EmptyState';
import SnackbarRef from '../../../../Provider/SnackbarProvider/SnackbarRef';
import { realm } from '@Khayat/Database/Queries/User';
import Message from '@Khayat/Database/Models/Message';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';

export const ChatUsersList: React.FC = () => {
  const { users } = useRealmUsers();
  const messages = realm.objects('Message');
  const sortedUsersAphabet = users.sorted('first_name');
  const { id } = useSelector(AuthSelector);
  const activeUsers = Array.from(
    sortedUsersAphabet.sorted('isActive', true).filtered('unreadCount = 0')
  );
  const unreadMessages = Array.from(
    sortedUsersAphabet.filtered('unreadCount > 0').sorted('unreadCount', true)
  );
  const sections = useMemo(() => {
    if (users.length > 0) {
      return [
        unreadMessages.length > 0 ? 'unread messages' : '',
        ...unreadMessages,
        'Direct Messages',
        ...activeUsers.slice(0, 10),
      ];
    }
    return [];
  }, [unreadMessages, activeUsers, users]);

  useEffect(() => {
    // @ts-ignore
    messages.addListener(function (messages: Message[], changes) {
      if (changes.insertions.length > 0) {
        const message = messages[changes.insertions[0]];
        if (message.from._id !== id)
          SnackbarRef.current?.showSnackbar({
            subtitle: message?.message,
            title: message?.from?.first_name,
          });
      }
    });

    return () => {
      messages.removeAllListeners();
    };
  }, []);

  return (
    <SectionsList
      data={sections}
      SectionListHeaderComponent={Header}
      SectionListItemComponent={ChatUser}
      ListEmptyComponent={EmptyState}
      ItemSeparatorComponent={Separator}
    />
  );
};

const Header: React.FC<{ title: string }> = ({ title }) => {
  if (title === '') return null;
  return (
    <View style={{ marginVertical: 11, marginHorizontal: 22 }}>
      <Text weight="bold" fontSize={11} style={{ textTransform: 'uppercase' }}>
        {title}
      </Text>
    </View>
  );
};
