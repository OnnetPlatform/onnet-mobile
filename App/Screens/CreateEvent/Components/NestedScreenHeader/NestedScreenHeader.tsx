import Icon from '@Atoms/Icon';
import Text from '@Atoms/Text';
import { useColors } from '@Theme/index';
import React from 'react';
import { Pressable, View } from 'react-native';

import withColors from './NestedScreenHeader.styles';
import { NestedScreenHeaderPropTypes } from './types';

export const NestedScreenHeader: React.FC<NestedScreenHeaderPropTypes> = ({
  title,
  onBackPressed,
  onSavePressed,
}) => {
  const colors = useColors();
  const styles = withColors(colors);
  return (
    <View style={styles.header}>
      <Pressable onPress={onBackPressed}>
        <Icon name={'arrow-ios-back-outline'} />
      </Pressable>

      <Text fontSize={17} weight="semibold">
        {title}
      </Text>
      <Pressable onPress={onSavePressed}>
        <Icon name={'checkmark-outline'} />
      </Pressable>
    </View>
  );
};

export default NestedScreenHeader;
