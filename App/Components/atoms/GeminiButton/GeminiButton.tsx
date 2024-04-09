import StarsIcon from '@Icons/StarsIcon';
import { useStyles } from '@Theme/Colors';
import { useColors } from '@Theme/index';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Separator, Text } from '..';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
export const GeminiButton: React.FC<{
  onPress: () => void;
  loading: boolean;
}> = ({ onPress, loading }) => {
  const colors = useColors();
  const { backgroundColor, borderColor } = useStyles();
  const angle = useSharedValue(0);
  const animatedProps = useAnimatedProps(() => ({ angle: angle.value }));

  useEffect(() => {
    if (loading)
      angle.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    else angle.value = 0;
  }, [loading]);
  return (
    <Pressable
      disabled={loading}
      style={[backgroundColor, styles.button, borderColor]}
      onPress={onPress}>
      <MaskedView maskElement={<StarsIcon />}>
        <AnimatedLinearGradient
          style={{ width: 24, height: 24 }}
          useAngle={true}
          colors={[colors.yellow, colors.pink, colors.cyan]}
          animatedProps={animatedProps}
        />
      </MaskedView>
      {loading ? null : (
        <>
          <Separator horizontal />
          <Text exiting={FadeOut} entering={FadeIn} weight="bold">
            Ask
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    alignSelf: 'flex-end',
  },
});

export default GeminiButton;
