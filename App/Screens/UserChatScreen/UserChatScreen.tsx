import { HeaderLoader, SectionsList } from '@Atoms';
import { MessagingSelector } from '@Khayat/Redux/Selectors/MessagingSelector';
import ChatEmptyState from '@Molecules/ChatEmptyState';
import { useNavigation } from '@react-navigation/native';
import { BOTTOM_BAR_HEIGHT, useColors } from '@Theme';
import React, { useCallback, useRef } from 'react';
import { Pressable, View } from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { Icon, Separator, Text } from '../../Components/atoms';
import Avatar from '../../Components/atoms/Avatar/Avatar';
import { useRoomMessages } from '../../Database/Hooks/useRealmMessages';
import { MessageHeader } from './components';
import { FormattedMessages } from './components/MessageItem/utils';
import styles from './UserChatScreen.styles';
import MessageInputProvider from '../../Provider/MessageInputProvider';
import { TextMessage } from './components/TextMessage/TextMessage';
import { FlashList } from '@shopify/flash-list';

export const UserChatScreen: React.FC = ({ route }: any) => {
  const { user } = route.params;
  const ref = useRef<FlashList<any>>(null);

  const msgs: FormattedMessages[] = useRoomMessages(user);
  const colors = useColors();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const withColors = styles(colors, insets);
  const { isConnected } = useSelector(MessagingSelector);

  const ListEmptyComponent = useCallback(() => {
    return <ChatEmptyState username={user.first_name} />;
  }, []);

  return (
    <SafeAreaView style={withColors.page} edges={['bottom', 'left', 'right']}>
      <View style={withColors.header}>
        <Pressable
          style={withColors.headerBack}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-ios-back'} />
        </Pressable>
        <Pressable
          onPress={() =>
            // @ts-ignore
            navigation.navigate('ProfileScreen', { id: user.user })
          }
          style={[withColors.row, { alignItems: 'center' }]}>
          <Avatar avatar={user.avatar} isActive={user.isActive} />
          <Separator horizontal />
          <Text weight="bold" fontSize={16}>
            {user.first_name} {user.last_name}
          </Text>
        </Pressable>
      </View>
      {isConnected ? null : <HeaderLoader />}
      <SectionsList
        data={msgs}
        SectionListHeaderComponent={MessageHeader}
        onContentSizeChange={() => {
          if (ref.current && msgs.length > 10)
            ref.current.scrollToEnd({ animated: true });
        }}
        SectionListItemComponent={TextMessage}
        contentContainerStyle={{ paddingBottom: BOTTOM_BAR_HEIGHT + 80 }}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        ref={ref}
      />
      <MessageInputProvider user={user} />
    </SafeAreaView>
  );
};

export default UserChatScreen;
