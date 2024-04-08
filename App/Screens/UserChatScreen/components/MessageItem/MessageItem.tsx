import { Separator, Text } from '@Atoms';
import React from 'react';
import { View } from 'react-native';

import styles from '../../UserChatScreen.styles';
import { useStyles } from '@Theme/Colors';

export const MessageItem: React.FC<{ title: string }> = React.memo(
  ({ title }) => {
    const { backgroundSecondary } = useStyles();
    return (
      <View style={[styles.row, backgroundSecondary]}>
        <Separator horizontal />
        <View style={styles.flex}>
          <Text fontSize={15} weight={'bold'}>
            {title}
          </Text>
        </View>
      </View>
    );
  }
);
export default MessageItem;
