import { useWorkspaceUsers } from '@Hooks/useWorkspaceUsers';
import { useColors } from '@Theme/index';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import NestedScreenHeader from '../Components/NestedScreenHeader/NestedScreenHeader';
import useSave from '../Hooks/useSave';
import Separator from '@Atoms/Separator';

import { ProfileObject } from '@Khayat/Database/Models/types';
import CheckBox from '@Atoms/CheckBox';
import styles from './styles';
import { useEventContext } from '@Context/EventContext/EventContext';
import User from '@Molecules/User';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@Khayat/Redux/Selectors/AuthSelector';

export const EventInvitations: React.FC = () => {
  const colors = useColors();
  const { users } = useWorkspaceUsers();
  const {
    event: { invitations },
  } = useEventContext();
  const [invites, setInvites] = useState<string[]>(invitations);
  const { id } = useSelector(AuthSelector);
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
      const isYou = id === item.user;
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            isChecked={isChecked}
            disabled={isYou}
            onChange={() => onCheckItem(item, !isChecked)}
          />
          <Separator horizontal size={'md'} />
          <Separator horizontal size={'md'} />
          <User disabled {...item} />
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
