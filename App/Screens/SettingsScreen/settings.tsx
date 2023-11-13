import React, { useMemo } from 'react';
import { SettingItem as SettingItemType, SettingsScreenNavigationProps } from './types';
import { Separator, Text } from '@Atoms';
import { FlatList } from 'react-native-gesture-handler';
import { SettingItem } from './components';

export const useSettings: (navigation: SettingsScreenNavigationProps) => SettingItemType[] = (
  navigation
) => {
  const settings = useMemo(
    () => [
      {
        title: 'Notifications',
        icon: 'bell-outline',
        onPress: () => {
          navigation.navigate('CustomScreen', {
            title: 'Notifications',
            content: (
              <FlatList
                data={[
                  {
                    title: 'Notifications',
                    icon: 'bell-outline',
                    onPress: () => {
                      navigation.push('CustomScreen', {
                        title: ';kasm',
                        content: <Text>asxmax</Text>,
                      });
                    },
                  },
                ]}
                ItemSeparatorComponent={() => <Separator size={'md'} />}
                renderItem={({ item }) => {
                  return <SettingItem {...item} />;
                }}
              />
            ),
          });
        },
        settings: [
          {
            title: 'Notifications',
            icon: 'bell-outline',
            onPress: () => {},
          },
        ],
      },
      { title: 'Appearance', icon: 'color-palette-outline', onPress: () => {} },
      {
        title: 'Terms and conditions',
        icon: 'settings-outline',
        onPress: () => {},
      },
      { title: 'Accessibility', icon: 'file-outline', onPress: () => {} },
      { title: 'Language', icon: 'globe-outline', onPress: () => {} },
      { title: 'Advanced', icon: 'settings-outline', onPress: () => {} },
      { title: 'App Icon', icon: 'settings-outline', onPress: () => {} },
      {
        title: 'Privacy & Visibility',
        icon: 'settings-outline',
        onPress: () => {},
      },
    ],
    []
  );

  return settings;
};