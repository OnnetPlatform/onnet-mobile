import { useColors } from '@Theme';
import React, { useMemo } from 'react';
import { Image, View } from 'react-native';

import styles from './Avatar.styles';

export const Avatar: React.FC<{ avatar: string; isActive: boolean }> = ({
  avatar,
  isActive,
}) => {
  const colors = useColors();
  const indicator = useMemo(
    () => ({
      borderColor: isActive ? 'green' : colors.text,
      backgroundColor: isActive ? 'green' : colors.background,
    }),
    [isActive]
  );
  return (
    <View>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View
        style={[styles.indicatorWrapper, { borderColor: colors.background }]}>
        <View style={[styles.indicator, indicator]} />
      </View>
    </View>
  );
};

export default Avatar;
