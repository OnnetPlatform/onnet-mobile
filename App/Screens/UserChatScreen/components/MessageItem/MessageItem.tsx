import { Separator, Text } from '@Atoms';
import { useColors } from '@Theme';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from '../../UserChatScreen.styles';
import { FormattedMessages } from './utils';

export const MessageItem: React.FC<{ item: FormattedMessages; index: number }> =
  React.memo(
    ({ item, index }) => {
      const colors = useColors();
      const insets = useSafeAreaInsets();
      const withColors = styles(colors, insets);
      const { user } = item;
      return (
        <>
          <View key={index} style={withColors.row}>
            <Separator horizontal />
            <View style={withColors.flex}>
              <Text fontSize={15} weight={'bold'}>
                {user.first_name} {user.last_name}
              </Text>
            </View>
          </View>
          <Separator />
        </>
      );
    },
    (prev, next) => prev.item.user._id === next.item.user._id
  );
export default MessageItem;
