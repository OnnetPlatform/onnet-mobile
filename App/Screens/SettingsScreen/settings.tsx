import { Separator, Text } from '@Atoms';
import { realm } from '@Khayat/Database/Queries/User';
import { AuthCreators } from '@Khayat/Redux';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { SettingItem } from './components';
import {
  SettingItem as SettingItemType,
  SettingsScreenNavigationProps,
} from './types';
import { FlashList } from '@shopify/flash-list';

export const useSettings: (
  navigation: SettingsScreenNavigationProps
) => SettingItemType[] = (navigation) => {
  const dispatch = useDispatch();
  const settings = useMemo(
    () => [
      {
        title: 'Notifications',
        icon: 'bell-outline',
        onPress: () => {
          navigation.navigate('CustomScreen', {
            title: 'Notifications',
            content: (
              <FlashList
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
        icon: 'file-outline',
        onPress: () => {},
      },
      {
        title: 'Logout',
        icon: 'log-out-outline',
        onPress: () => {
          dispatch(AuthCreators.reset());
          realm.write(() => {
            realm.deleteAll();
          });
        },
      },
    ],
    []
  );

  return settings;
};
