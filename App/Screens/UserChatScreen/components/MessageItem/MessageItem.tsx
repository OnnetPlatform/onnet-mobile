import { Separator, Text } from '@Atoms';
import { useColors } from '@Theme';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from '../../UserChatScreen.styles';

export const MessageItem: React.FC<{ title: string }> = React.memo(
  ({ title }) => {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const withColors = styles(colors, insets);
    return (
      <View style={withColors.row}>
        <Separator horizontal />
        <View style={withColors.flex}>
          <Text fontSize={15} weight={'bold'}>
            {title}
          </Text>
        </View>
      </View>
    );
  }
);
export default MessageItem;
