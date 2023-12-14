import { Icon, Separator, Text } from '@Atoms';
import { useColors } from '@Theme';
import React from 'react';
import { Pressable, View } from 'react-native';

import withColors from './Header.styles';

export const Header: React.FC<{
  onSavePressed: () => void;
  onDismissPressed: () => void;
}> = ({ onSavePressed, onDismissPressed }) => {
  const colors = useColors();
  const styles = withColors(colors);
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Pressable hitSlop={24} onPress={onDismissPressed}>
          <Icon name={'close-outline'} />
        </Pressable>

        <Separator horizontal size={'md'} />
        <View>
          <Text fontSize={16} weight="bold">
            New Event
          </Text>
          <Text fontSize={12} weight="light">
            Calendar
          </Text>
        </View>
      </View>
      <Pressable hitSlop={24} onPress={onSavePressed}>
        <Icon name={'checkmark-outline'} />
      </Pressable>
    </View>
  );
};
export default Header;
