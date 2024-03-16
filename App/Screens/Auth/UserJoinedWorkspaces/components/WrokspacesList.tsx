import Separator from '@Atoms/Separator';
import Text from '@Atoms/Text';
import { UserCreators } from '@Khayat/Redux';
import { RolesWorkspaces } from '@Khayat/Redux/Reducers/UserReducer/types';
import { UserSelector } from '@Khayat/Redux/Selectors/UserSelector';
import { SolidButton } from '@Molecules/SolidButton/SolidButton';
import React, { useCallback, useEffect } from 'react';
import { FlatList, Image, View, ListRenderItem, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { useBottomSheet } from '@Context/BottomSheet';

export const WorkspacesLists: React.FC<{ style?: ViewStyle }> = ({ style }) => {
  const { workspaces } = useSelector(UserSelector);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { hideBottomSheet } = useBottomSheet();
  const onItemPressed = useCallback((item: RolesWorkspaces) => {
    hideBottomSheet();
    dispatch(UserCreators.joinWorkspace(item.workspace._id));
  }, []);

  const renderWorkspaces: ListRenderItem<RolesWorkspaces> = useCallback(
    ({ item }) => {
      return (
        <View style={styles.workspace_item_container}>
          <View style={styles.workspace_item_body}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1709891798937-fd431bd7e10b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
              }}
              style={styles.workspace_item_avatar}
            />
            <Separator horizontal />
            <Text weight="bold" fontSize={16}>
              {item.workspace.name}
            </Text>
          </View>
          <SolidButton onPress={() => onItemPressed(item)}>
            <Text weight="bold">Join</Text>
          </SolidButton>
        </View>
      );
    },
    [workspaces, isFocused]
  );

  useEffect(() => {
    if (isFocused) dispatch(UserCreators.getUserWorkspaces());
  }, [isFocused]);

  return (
    <FlatList
      data={workspaces}
      style={{ width: '100%' }}
      keyExtractor={(item) => item.workspace._id}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style}
      renderItem={renderWorkspaces}
    />
  );
};
