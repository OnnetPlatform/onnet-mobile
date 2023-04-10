import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../Components/atoms';
import { GradientLayout } from '../../Components/HOCs';
import { useSocketContext } from '../../Context/SocketContext/SocketContext';
import { useColors } from '../../Theme';
import ChatUser from './components/ChatUser';
import styles from './HomeChatScreen.styles';

export const HomeChatScreen: React.FC = () => {
  const { connectedUsers } = useSocketContext();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const withColors = styles(colors, insets);
  const users = Array.from(connectedUsers, ([_, value]) => ({ ...value }));

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
          maxToRenderPerBatch={10}
          style={{ minHeight: '100%' }}
          renderItem={({ item }) => <ChatUser {...item} />}
        />
      </GradientLayout>
    </SafeAreaView>
  );
};

export default HomeChatScreen;
