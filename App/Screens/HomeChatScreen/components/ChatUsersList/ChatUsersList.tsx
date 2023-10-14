import React from 'react';
import {SectionList, Dimensions} from 'react-native';
import {useRealmUsers} from '../../../../Database/Hooks/useRealmUsers';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import ChatUser from '../ChatUser/ChatUser';
import {HackerText, Text} from '../../../../Components/atoms';
import {useColors} from '../../../../Theme';
import {View} from 'react-native';
const {width, height} = Dimensions.get('screen');
export const ChatUsersList: React.FC = () => {
  const {users} = useRealmUsers();
  const sortedUsersAphabet = users.sorted('name');
  const colors = useColors();

  const activeUsers = Array.from(
    sortedUsersAphabet.sorted('isActive', true).filtered('unreadCount = 0'),
  );
  const unreadMessages = Array.from(
    sortedUsersAphabet.filtered('unreadCount > 0').sorted('unreadCount', true),
  );

  const sections =
    users.length > 0
      ? [
          {
            title: 'Unread messages',
            data: unreadMessages,
          },
          {title: 'Users', data: activeUsers.slice(0, 10)},
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
      keyExtractor={item => item.name}
      // @ts-ignore
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={10}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              width,
              height,
              top: -120,
              zIndex: -1,
            },
          ]}>
          <View
            style={{
              width: '80%',
              backgroundColor: colors.blur,
              padding: 16,
              borderRadius: 8,
            }}>
            <Text
              weight="bold"
              style={{textAlign: 'center', textTransform: 'uppercase'}}>
              Don't worry they will be around
            </Text>
            <Text style={{marginTop: 8, textAlign: 'center'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum hendrerit bibendum efficitur.
            </Text>
          </View>
        </View>
      }
      scrollEnabled={users.length > 0}
      renderItem={({item}) => {
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
      renderSectionHeader={({section}) =>
        section.data.length > 0 ? (
          <Text
            weight="bold"
            style={{padding: 8, backgroundColor: colors.blur}}>
            {section.title}
          </Text>
        ) : null
      }
    />
  );
};
