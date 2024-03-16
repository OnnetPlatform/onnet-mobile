import { useColors } from '@Theme';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeColors } from '@Theme/Colors';
import Text from '@Atoms/Text';
import { Profile } from '@Khayat/Database/Profile';
import { useRealmProfiles } from '../../../../Database/Hooks/useRealmProfiles';

export const TypingIndicator: React.FC<{ opponent: Profile }> = React.memo(
  ({ opponent }) => {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const withColors = styles(colors, insets);
    const { getUser } = useRealmProfiles();
    const opacity = useSharedValue(0);
    const localUser = getUser(opponent);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    useEffect(() => {
      opacity.value = withTiming(localUser?.status ? 1 : 0, { duration: 500 });
    }, [localUser, localUser?.status]);

    return (
      <View style={withColors.handleWrapper}>
        <View style={withColors.handleIndicator} />
        <View style={withColors.typingWrapper}>
          <Text style={animatedStyle}>typing...</Text>
        </View>
      </View>
    );
  }
);

const styles = (colors: ThemeColors, insets: EdgeInsets) =>
  StyleSheet.create({
    handleWrapper: {
      justifyContent: 'center',
      height: 33,
    },
    handleIndicator: {
      height: 3,
      width: 40,
      backgroundColor: colors.cyan,
      alignSelf: 'center',
      position: 'absolute',
      zIndex: 100,
      borderRadius: 4,
      opacity: 0.6,
    },
    typingWrapper: {
      overflow: 'hidden',
      borderRadius: 16,
      paddingLeft: 22,
    },
  });

export function contentStyle(isOpen: boolean) {
  return {
    paddingBottom: isOpen ? 100 : 200,
  };
}

export default TypingIndicator;
