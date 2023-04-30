import React from 'react';
import { SectionList } from 'react-native';
import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import ChatUser from '../ChatUser/ChatUser';
import { Text } from '../../../../Components/atoms';
import { useColors } from '../../../../Theme';

export const ChatUsersList: React.FC = () => {
  const { users } = useRealmUsers();
  const sortedUsersAphabet = users.sorted('name');
  const colors = useColors();
  const activeUsers = sortedUsersAphabet
    .sorted('isActive', true)
    .filter((user) => user.unreadCount === 0);
  const unreadMessages = sortedUsersAphabet
    .sorted('unreadCount', true)
    .filter((user) => user.unreadCount > 0);

  const sections = [
    {
      title: 'Unread messages',
      data: unreadMessages,
    },
    { title: 'Users', data: activeUsers.slice(0, 4) },
  ];
  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => 50,
    getSeparatorHeight: () => 16,
    getSectionHeaderHeight: () => 30,
    getSectionFooterHeight: () => 0,
  });
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.name}
      // @ts-ignore
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={10}
      showsVerticalScrollIndicator={false}
      renderItem={({ section, item }) => {
        return (
          <ChatUser
            key={item.name}
            name={item.name}
            avatar={item.avatar}
            isActive={item.isActive}
            id={item.id}
            unreadCount={item.unreadCount}
            status={item.status}
          />
        );
      }}
      renderSectionHeader={({ section }) =>
        section.data.length > 0 ? (
          <Text weight="bold" style={{ padding: 8, backgroundColor: colors.background }}>
            {section.title}
          </Text>
        ) : null
      }
    />
  );
};
