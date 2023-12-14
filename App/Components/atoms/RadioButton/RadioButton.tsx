import { useColors } from '@Theme';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, TextStyle, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '..';

type Props = {
  onPress(): void;
  active: boolean;
  title: string;
  backgroundColor?: string;
  leftImage?: null;
  textStyle?: TextStyle;
  onRightImagePressed?(): void;
};
export const RadioButton: React.FC<Props> = (props) => {
  const { active, onPress, title } = props;
  const value = useSharedValue<number>(0);
  const colors = useColors();
  const animatedBackground = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        value.value,
        [0, 25],
        [colors.secondaryBackground, colors.turquoise]
      ),
    }),
    [value]
  );
  const radioStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: value.value }],
      backgroundColor: interpolateColor(
        value.value,
        [0, 25],
        ['#ddd', colors.secondaryBackground]
      ),
    }),
    [value]
  );
  useEffect(() => {
    value.value = withTiming(active ? 25 : 0, {
      duration: 500,
    });
  }, [active]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.rowContainer}>
        <Pressable
          hitSlop={20}
          onPress={props.onRightImagePressed ? props.onRightImagePressed : null}
        />

        <Text weight="semibold" fontSize={18}>
          {title}
        </Text>
      </View>

      <Animated.View style={[styles.radioContainer, animatedBackground]}>
        <Animated.View style={[radioStyle, styles.radio]} />
      </Animated.View>
    </Pressable>
  );
};

export default RadioButton;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioContainer: {
    width: 54,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    overflow: 'hidden',
    padding: 2,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 24,
  },
  title: {
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
