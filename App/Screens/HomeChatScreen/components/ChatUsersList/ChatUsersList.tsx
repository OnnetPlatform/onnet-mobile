import { Blur, Separator, Text } from '@Atoms';
import React, { useCallback, useMemo } from 'react';
import { SectionList, View, useWindowDimensions } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import ChatUser from '../ChatUser/ChatUser';
import EmptyState from './components/EmptyState';
import { useColors } from '@Theme/index';
import Texture from '@Skia/Texture/Texture';

export const ChatUsersList: React.FC = () => {
  const { users } = useRealmUsers();
  const sortedUsersAphabet = users.sorted('name');
  const colors = useColors();
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
        { title: 'DM', data: activeUsers.slice(0, 10) },
      ];
    }
    return [];
  }, [unreadMessages, activeUsers, users]);

  const renderItem = useCallback(({ item }: any) => {
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
      keyExtractor={(item) => item.id}
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
            <Text weight="bold" style={{ textTransform: 'uppercase' }}>
              {section.title}
            </Text>
          </View>
        ) : null
      }
    />
  );
};
