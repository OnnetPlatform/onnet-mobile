import { Avatar, Text } from '@Atoms';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '../../../../Theme';
import styles from '../../UserChatScreen.styles';
import { FormattedMessages } from './utils';

export const MessageItem: React.FC<{ item: FormattedMessages; index: number }> =
  React.memo(({ item, index }) => {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const withColors = styles(colors, insets);
    const { user } = item;
    return (
      <View key={index} style={withColors.row}>
        <View>
          <Avatar avatar={user?.avatar} isActive={user.isActive} />
        </View>

        <View style={withColors.flex}>
          <Text fontSize={15} weight={'bold'}>
            {user.name}
          </Text>
        </View>
      </View>
    );
  });
export default MessageItem;
