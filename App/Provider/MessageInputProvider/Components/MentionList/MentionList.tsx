import Avatar from '@Atoms/Avatar';
import Text from '@Atoms/Text';
import { useRealmUsers } from '../../../../Database/Hooks/useRealmUsers';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, Pressable, StyleSheet } from 'react-native';
import Separator from '@Atoms/Separator';
import User from '@Khayat/Database/Models/User';
import { useMessageInputContext } from '@Context/MessageInputContext/MessageInputContext';

export const MentionList: React.FC = () => {
  const { users } = useRealmUsers();
  const { setTextMessage, openMentionsList, toggleMentionsList } =
    useMessageInputContext();

  const onItemPressed = (item: User) => {
    setTextMessage((text) => `${text}\n@${item.first_name} ${item.last_name}`);
  };
  const renderItem: ListRenderItem<User> = useCallback(
    ({ item }) => {
      return (
        <Pressable style={styles.item} onPress={() => onItemPressed(item)}>
          <Avatar avatar={item.avatar} isActive={item.isActive} />
          <Separator size={'sm'} horizontal />
          <Text weight="bold">
            {item.first_name} {item.last_name}
          </Text>
        </Pressable>
      );
    },
    [users]
  );
  if (openMentionsList)
    return (
      <FlatList
        data={users}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    );
  return null;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  container: {
    paddingBottom: 20,
  },
});

export default MentionList;
