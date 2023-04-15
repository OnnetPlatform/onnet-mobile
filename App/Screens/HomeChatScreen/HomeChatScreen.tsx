// @ts-nocheck
import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../Components/atoms';
import { GradientLayout } from '../../Components/HOCs';
import { useColors } from '../../Theme';
import ChatUser from './components/ChatUser';
import styles from './HomeChatScreen.styles';
import { useRealmUsers } from '../../Database/Hooks/useRealmUsers';

export const HomeChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const withColors = styles(colors, insets);
  const { users } = useRealmUsers();
  return (
    <SafeAreaView style={withColors.screen}>
      <GradientLayout>
        <View style={withColors.header}>
          <Text weight="bold" fontSize={24}>
            Onnet
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          contentContainerStyle={{ paddingBottom: 120 }}
          maxToRenderPerBatch={10}
          keyExtractor={(item) => item.name}
          style={{ minHeight: '100%' }}
          renderItem={({ item }) => (
            <ChatUser
              key={item.name}
              name={item.name}
              avatar={item.avatar}
              isActive={item.isActive}
              id={item.id}
              unreadCount={item.unreadCount}
            />
          )}
        />
      </GradientLayout>
    </SafeAreaView>
  );
};

export default HomeChatScreen;
