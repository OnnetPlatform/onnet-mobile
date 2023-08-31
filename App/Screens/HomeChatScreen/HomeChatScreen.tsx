// @ts-nocheck
import React, { useEffect } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Text } from '../../Components/atoms';
import { useColors } from '../../Theme';
import styles from './HomeChatScreen.styles';
import { ChatUsersList } from './components/ChatUsersList/ChatUsersList';
import Images from '../../Theme/Images';

export const HomeChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const withColors = styles(colors, insets);

  return (
    <SafeAreaView style={withColors.screen}>
      <View style={withColors.header}>
        <View style={withColors.rowWrapper}>
          <View style={withColors.logoWrapper}>
            <Image source={Images.logo} style={withColors.logo} />
          </View>
          <Text weight="bold" fontSize={18}>
            Onnet
          </Text>
        </View>
        <Icon name={'person-add-outline'} />
      </View>
      <ChatUsersList />
    </SafeAreaView>
  );
};

export default HomeChatScreen;
