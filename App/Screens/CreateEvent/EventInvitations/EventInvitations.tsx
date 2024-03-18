import Avatar from '@Atoms/Avatar';
import { useWorkspaceUsers } from '@Hooks/useWorkspaceUsers';
import { useColors } from '@Theme/index';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import NestedScreenHeader from '../Components/NestedScreenHeader/NestedScreenHeader';
import useSave from '../Hooks/useSave';
import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';

import { ProfileObject } from '@Khayat/Database/Models/types';
import CheckBox from '@Atoms/CheckBox';
import styles from './styles';

export const EventInvitations: React.FC = () => {
  const colors = useColors();
  const { users } = useWorkspaceUsers();
  const [invites, setInvites] = useState<string[]>([]);
  const { onBackPressed, onSavePressed } = useSave({
    key: 'invitations',
    value: invites,
  });

  const borderColor = useMemo(
    () => ({
      borderColor: colors.secondaryBackground,
    }),
    [colors]
  );

  const backgroundColor = useMemo(
    () => ({
      backgroundColor: colors.background,
    }),
    [colors]
  );

  const onCheckItem = useCallback(
    (item: ProfileObject, isChecked: boolean) => {
      if (isChecked) {
        setInvites((data) => [...data, item.id]);
      } else {
        setInvites((data) => data.filter((itm) => itm !== item.id));
      }
    },
    [invites, users]
  );

  const renderItem: ListRenderItem<ProfileObject> = useCallback(
    ({ item }) => {
      const isChecked = invites.find((i) => i === item.id) !== undefined;
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            isChecked={isChecked}
            onChange={() => onCheckItem(item, !isChecked)}
          />
          <Separator horizontal size={'md'} />
          <Separator horizontal size={'md'} />
          <Avatar avatar={item.avatar} isActive={item.active === true} />
          <Separator horizontal />
          <Text fontSize={16} weight="bold">
            {item.first_name} {item.last_name}
          </Text>
        </View>
      );
    },
    [invites, users]
  );

  const ListHeaderComponent = useCallback(
    () => (
      <>
        <TextInput style={[borderColor, styles.input]} placeholder="Search" />
        <Separator size={'md'} />
      </>
    ),
    []
  );
  const ItemSeparatorComponent = useCallback(
    () => <Separator size={'md'} />,
    []
  );

  return (
    <SafeAreaView style={[backgroundColor, styles.screen]}>
      <NestedScreenHeader
        title={'Invite Members'}
        onSavePressed={onSavePressed}
        onBackPressed={onBackPressed}
      />
      <FlatList
        data={users}
        contentContainerStyle={styles.container_style}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default EventInvitations;
