import React from 'react';
import { SettingItem as SettingItemType } from '../../types';
import { Pressable, View } from 'react-native';
import { Icon, Text } from '@Atoms';
import { useColors } from '@Theme';
import withColors from './styles';

export const SettingItem: React.FC<SettingItemType> = ({ onPress, icon, title }) => {
  const colors = useColors();
  const styles = withColors(colors);
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon name={icon} size={14} />
      <Text weight="bold" fontSize={14} style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
};
export default SettingItem;
