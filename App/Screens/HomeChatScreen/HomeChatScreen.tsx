import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, Text } from '../../Components/atoms';
import { HeaderLoader } from '../../Components/atoms/HeaderLoader/HeaderLoader';
import { useColors } from '../../Theme';
import Images from '../../Theme/Images';
import { ChatUsersList } from './components/ChatUsersList/ChatUsersList';
import styles from './HomeChatScreen.styles';

export const HomeChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const withColors = styles(colors, insets);
  const navigation = useNavigation();

  // @ts-ignore
  const onSettingsPressed = () => navigation.navigate('Settings');

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
        <View style={withColors.rowWrapper}>
          <Icon style={{ marginRight: 10 }} name={'person-add-outline'} />
          <Pressable onPress={onSettingsPressed}>
            <Icon name={'settings-outline'} />
          </Pressable>
        </View>
      </View>
      <HeaderLoader style={{ position: 'relative' }} />
      <ChatUsersList />
    </SafeAreaView>
  );
};

export default HomeChatScreen;
