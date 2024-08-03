import { Icon, Separator, Text } from '@Atoms';
import { useColors } from '@Theme';
import Images from '@Theme/Images';
import React from 'react';
import { Image, Pressable, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatUsersList } from './components/ChatUsersList/ChatUsersList';
import styles from './HomeChatScreen.styles';
import SnackbarRef from '../../Provider/SnackbarProvider/SnackbarRef';
import { useSelector } from 'react-redux';
import { UserSelector } from '@Khayat/Redux/Selectors/UserSelector';
import { useBottomSheet } from '@Context/BottomSheet';
import { WorkspacesLists } from '@Screens/Auth/UserJoinedWorkspaces/components/WrokspacesList';
import { useAppNavigation } from '@Hooks/useAppNavigation';

export const HomeChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const withColors = styles(colors, insets);
  const navigation = useAppNavigation();
  const { showBottomSheet } = useBottomSheet();
  const { current_workspace } = useSelector(UserSelector);

  const onSettingsPressed = () => navigation.navigate('Settings');
  const onWorkspacePressed = () => {
    showBottomSheet({
      body: () => (
        <View
          style={{
            width: '100%',
            paddingHorizontal: 22,
            paddingBottom: 22 + insets.bottom,
          }}>
          <Text
            fontSize={24}
            style={{ padding: 8, paddingBottom: 16 }}
            weight="bold"
            textAlign="center">
            Select workspace
          </Text>
          <WorkspacesLists style={{ paddingBottom: insets.bottom + 44 }} />
        </View>
      ),
    });
  };

  return (
    <SafeAreaView style={withColors.screen}>
      <View style={withColors.header}>
        <Pressable onPress={onWorkspacePressed} style={withColors.rowWrapper}>
          <View style={withColors.logoWrapper}>
            <Image source={Images.logo} style={withColors.logo} />
          </View>
          <Text weight="bold" fontSize={14}>
            {current_workspace.workspace.name}
          </Text>
        </Pressable>
        <View style={withColors.rowWrapper}>
          <Pressable
            onPress={() => {
              navigation.navigate('CreateAnnouncement');
            }}>
            <Icon name={'radio-outline'} width={18} />
          </Pressable>
          <Separator horizontal />
          <Pressable
            onPress={() => {
              if (SnackbarRef.current)
                SnackbarRef.current.showSnackbar({
                  title: 'Welcome to Onnet!',
                  variant: 'SUCCESS',
                  subtitle: 'We are happy to have you.',
                });
            }}>
            <Icon name={'person-add-outline'} width={18} />
          </Pressable>

          <Separator horizontal />
          <Pressable onPress={onSettingsPressed}>
            <Icon name={'settings-outline'} width={18} />
          </Pressable>
        </View>
      </View>
      <ChatUsersList />
    </SafeAreaView>
  );
};

export default HomeChatScreen;
