import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon, Text } from '../../../../Components/atoms';
import { useColors } from '../../../../Theme';
import { useThemeStyle } from './VideoRoomScreenHeader.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
export const VideoRoomScreenHeader: React.FC = () => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useThemeStyle(colors, insets);
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.header}>
      <Pressable onPress={onPressBack}>
        <Icon name="arrow-back" />
      </Pressable>
      <Text fontSize={18} style={{ flex: 1, textAlign: 'center' }} weight="bold">
        Unified Components Team 1
      </Text>
    </View>
  );
};
