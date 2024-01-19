import { Blur, Text } from '@Atoms';
import React from 'react';
import { SectionList } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import ChatUser from '../ChatUser/ChatUser';
import EmptyState from './components/EmptyState';

export const ChatUsersList: React.FC = () => {
  const { users } = useRealmUsers();
  const sortedUsersAphabet = users.sorted('name');

  const activeUsers = Array.from(
    sortedUsersAphabet.sorted('isActive', true).filtered('unreadCount = 0')
  );
  const unreadMessages = Array.from(
    sortedUsersAphabet.filtered('unreadCount > 0').sorted('unreadCount', true)
  );
  const renderItem = ({ item }: any) => {
    return (
      <ChatUser
        key={item.name}
        name={item.name}
        avatar={item.avatar}
        isActive={item.isActive}
        id={item.id}
        unreadCount={item.unreadCount}
        status={item.status}
        user_id={item.user_id}
      />
    );
  };
  const sections =
    users.length > 0
      ? [
          {
            title: 'Unread messages',
            data: unreadMessages,
          },
          { title: 'DM', data: activeUsers.slice(0, 10) },
        ]
      : [];

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => 50,
    getSeparatorHeight: () => 16,
    getSectionHeaderHeight: () => 30,
    getSectionFooterHeight: () => 0,
  });

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      // @ts-ignore
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={10}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={EmptyState}
      scrollEnabled={users.length > 0}
      renderItem={renderItem}
      renderSectionHeader={({ section }) =>
        section.data.length > 0 ? (
          <Blur style={{ padding: 10 }}>
            <Text weight="bold" style={{ textTransform: 'uppercase' }}>
              {section.title}
            </Text>
          </Blur>
        ) : null
      }
    />
  );
};
