import { useMemo } from 'react';
import { SettingItem } from './types';

export const useSettings: () => SettingItem[] = () => {
  const settings = useMemo(
    () => [
      { title: 'Notifications', icon: 'bell-outline', onPress: () => {} },
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
