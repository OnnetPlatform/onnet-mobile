import React from 'react';
import { SettingItem as SettingItemType } from '../../types';
import { Pressable, View } from 'react-native';
import { Icon, Text } from '@Atoms';
import { useColors } from '@Theme';
import withColors from './styles';

export const SettingItem: React.FC<SettingItemType> = ({ onPress, icon, title, settings }) => {
  const colors = useColors();
  const styles = withColors(colors);
  return (
    <Pressable onPress={onPress} style={[styles.row, styles.between]}>
      <View style={styles.row}>
        <Icon name={icon} size={14} />
        <Text weight="bold" fontSize={14} style={styles.title}>
          {title}
        </Text>
      </View>
      {settings ? <Icon name={'arrow-ios-forward-outline'} style={styles.icon} /> : null}
    </Pressable>
  );
};
export default SettingItem;
