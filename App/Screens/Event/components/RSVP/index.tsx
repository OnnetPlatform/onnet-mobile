import Separator from '@Atoms/Separator';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from './styles';
import { useStyles } from '@Theme/Colors';
import useStatus from './useStatus';
import Text from '@Atoms/Text';

export const RSVP: React.FC = () => {
  const { backgroundSecondary } = useStyles();
  const status = useStatus();
  return (
    <View style={styles.container}>
      {status.map((item) => {
        const color: ViewStyle = {
          backgroundColor: item.color,
        };
        return (
          <View style={[styles.body, backgroundSecondary]}>
            <View style={[color, styles.indicator]} />
            <Separator horizontal />
            <Text>{item.title}</Text>
          </View>
        );
      })}
    </View>
  );
};
