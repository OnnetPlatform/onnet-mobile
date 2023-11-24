import { useNavigation } from '@react-navigation/native';
import { useColors } from '@Theme';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '../Icon';
import Text from '../Text';
import { withColors } from './styles';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = withColors(colors, insets);
  const navigation = useNavigation();

  const onArrowPressed = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Pressable onPress={onArrowPressed} style={styles.element}>
          <Icon name={'arrow-ios-back-outline'} />
        </Pressable>
        <Text fontSize={18} weight="bold" style={styles.title}>
          {title}
        </Text>
        <View style={styles.element} />
      </View>
    </View>
  );
};

export default Header;
