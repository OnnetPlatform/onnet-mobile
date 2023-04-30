// @ts-nocheck
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../Components/atoms';
import { GradientLayout } from '../../Components/HOCs';
import { useColors } from '../../Theme';
import styles from './HomeChatScreen.styles';
import { ChatUsersList } from './components/ChatUsersList/ChatUsersList';
import { HeaderLoader } from '../../Components/atoms/HeaderLoader/HeaderLoader';

export const HomeChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const withColors = styles(colors, insets);

  return (
    <SafeAreaView style={withColors.screen}>
      <GradientLayout>
        <View style={withColors.header}>
          <Text weight="bold" fontSize={24}>
            Onnet
          </Text>
          <Icon name={'plus-outline'} />
        </View>
        <ChatUsersList />
      </GradientLayout>
    </SafeAreaView>
  );
};

export default HomeChatScreen;
