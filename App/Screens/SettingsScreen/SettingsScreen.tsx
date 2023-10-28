import React from 'react';
import { useSettings } from './settings';
import { FlatList } from 'react-native';
import { PageView } from '@HOCs';
import { SettingItem } from './components';
import { Separator } from '@Atoms';

export const SettingsScreen: React.FC = () => {
  const settings = useSettings();
  return (
    <PageView title="Settings">
      <FlatList
        data={settings}
        ItemSeparatorComponent={() => <Separator size={'md'} />}
        renderItem={({ item }) => {
          return <SettingItem {...item} />;
        }}
      />
    </PageView>
  );
};

export default SettingsScreen;
