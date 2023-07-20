import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../../Components/atoms';
import { useColors } from '../../../../Theme';
import { useThemeStyle } from './VideoRoomScreenHeader.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const VideoRoomScreenHeader: React.FC = () => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useThemeStyle(colors, insets);
  return (
    <View style={styles.header}>
      <Text fontSize={18} style={{ flex: 1, textAlign: 'center' }} weight="bold">
        Unified Components Team 1
      </Text>
    </View>
  );
};
