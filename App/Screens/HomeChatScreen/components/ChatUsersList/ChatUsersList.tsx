import { Separator, Text } from '@Atoms';
import React, { useCallback, useMemo } from 'react';
import { SectionList, View, useWindowDimensions } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import ChatUser from '../ChatUser/ChatUser';
import EmptyState from './components/EmptyState';

export const ChatUsersList: React.FC = () => {
  const { users } = useRealmUsers();
  const sortedUsersAphabet = users.sorted('first_name');
  const { width } = useWindowDimensions();
  const activeUsers = Array.from(
    sortedUsersAphabet.sorted('isActive', true).filtered('unreadCount = 0')
  );
  const unreadMessages = Array.from(
    sortedUsersAphabet.filtered('unreadCount > 0').sorted('unreadCount', true)
  );
  const sections = useMemo(() => {
    if (users.length > 0) {
      return [
        {
          title: 'Unread messages',
          data: unreadMessages,
        },
        { title: 'Direct Messages', data: activeUsers.slice(0, 10) },
      ];
    }
    return [];
  }, [unreadMessages, activeUsers, users]);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <ChatUser
        key={item.name}
        first_name={item.first_name}
        avatar={item.avatar}
        isActive={item.isActive}
        id={item.id}
        unreadCount={item.unreadCount}
        status={item.status}
        _id={item._id}
        last_name={item.last_name}
      />
    );
  }, []);

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => 0,
    getSeparatorHeight: () => 0,
    getSectionHeaderHeight: () => 0,
    getSectionFooterHeight: () => 0,
  });

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item._id}
      // @ts-ignore
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={10}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={EmptyState}
      scrollEnabled={users.length > 0}
      ItemSeparatorComponent={() => <Separator size={'md'} />}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 22 }}
      renderSectionHeader={({ section }) =>
        section.data.length > 0 ? (
          <View
            style={{
              paddingHorizontal: 22,
              paddingVertical: 10,
              marginBottom: 16,
              width,
              marginHorizontal: -22,
            }}>
            <Text
              weight="bold"
              fontSize={11}
              style={{ textTransform: 'uppercase' }}>
              {section.title}
            </Text>
          </View>
        ) : null
      }
    />
  );
};
