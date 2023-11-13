import React from 'react';
import { useSettings } from './settings';
import { FlatList } from 'react-native';
import { PageView } from '@HOCs';
import { SettingItem } from './components';
import { Separator } from '@Atoms';
import { SettingsScreenProps } from './types';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const settings = useSettings(navigation);

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
