import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Text from '@Atoms/Text';
import { Profile } from '@Khayat/Database/Profile';
import { useRealmProfiles } from '../../../../Database/Hooks/useRealmProfiles';

export const TypingIndicator: React.FC<{ opponent: Profile }> = React.memo(
  ({ opponent }) => {
    const { getUser } = useRealmProfiles();
    const opacity = useSharedValue(0);
    const localUser = getUser(opponent);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    useEffect(() => {
      opacity.value = withTiming(localUser?.typing ? 1 : 0, { duration: 500 });
    }, [localUser, localUser?.typing]);

    return (
      <View style={styles.handleWrapper}>
        <View style={styles.typingWrapper}>
          <Text style={animatedStyle}>typing...</Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  handleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 8,
    position: 'absolute',
  },
  handleIndicator: {
    height: 2,
    width: 30,
    backgroundColor: '#323232',
    zIndex: 100,
    borderRadius: 4,
  },
  typingWrapper: {
    overflow: 'hidden',
    borderRadius: 16,
    width: 130,
  },
});

export function contentStyle(isOpen: boolean) {
  return {
    paddingBottom: isOpen ? 100 : 200,
  };
}

export default TypingIndicator;
