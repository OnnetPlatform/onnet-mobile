import { Icon, Separator, Text } from '@Atoms';
import { useColors } from '@Theme';
import React from 'react';
import { View } from 'react-native';

import withColors from './Header.styles';

export const Header: React.FC = () => {
  const colors = useColors();
  const styles = withColors(colors);
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Icon name={'close-outline'} />
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
      <Icon name={'checkmark-outline'} />
    </View>
  );
};
export default Header;
