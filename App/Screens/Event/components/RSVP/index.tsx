import Separator from '@Atoms/Separator';
import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import styles from './styles';
import { useStyles } from '@Theme/Colors';
import useStatus from './useStatus';
import Text from '@Atoms/Text';
import { useEvent } from '@Hooks/useEvent';
import { InvitationStatus } from '@Khayat/Graphql/Events';
import { useBottomSheet } from '@Context/BottomSheet';

export const RSVP: React.FC<{ event_id: string }> = ({ event_id }) => {
  const { backgroundSecondary } = useStyles();
  const status = useStatus();
  const { updateInvitation } = useEvent();
  const { hideBottomSheet } = useBottomSheet();
  return (
    <View style={styles.container}>
      {status.map((item) => {
        const color: ViewStyle = {
          backgroundColor: item.color,
        };
        const onPress = async () => {
          await updateInvitation({
            event_id,
            status: item.key as InvitationStatus,
          });
          hideBottomSheet();
        };
        return (
          <Pressable
            onPress={onPress}
            key={item.key}
            style={[styles.body, backgroundSecondary]}>
            <View style={[color, styles.indicator]} />
            <Separator horizontal />
            <Text>{item.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
