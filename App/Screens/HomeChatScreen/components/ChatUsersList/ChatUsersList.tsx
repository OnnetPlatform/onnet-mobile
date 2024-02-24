import { SectionsList, Separator, Text } from '@Atoms';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import ChatUser from '../ChatUser/ChatUser';
import EmptyState from './components/EmptyState';

export const ChatUsersList: React.FC = () => {
  const { users } = useRealmUsers();
  const sortedUsersAphabet = users.sorted('first_name');
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

  return (
    <SectionsList
      data={sections}
      SectionListHeaderComponent={Header}
      SectionListItemComponent={ChatUser}
      ListEmptyComponent={EmptyState}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={{ paddingHorizontal: 22 }}
    />
  );
};

const Header: React.FC<{ title: string }> = ({ title }) => {
  if (title === '') return null;
  return (
    <View style={{ marginVertical: 11 }}>
      <Text weight="bold" fontSize={11} style={{ textTransform: 'uppercase' }}>
        {title}
      </Text>
    </View>
  );
};
