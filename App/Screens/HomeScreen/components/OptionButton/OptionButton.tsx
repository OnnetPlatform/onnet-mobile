import Icon from '@Atoms/Icon';
import Text from '@Atoms/Text';
import { BOTTOM_BAR_HEIGHT, useColors } from '@Theme/index';
import MaskedView from '@react-native-masked-view/masked-view';
import React, { useCallback, useMemo } from 'react';
import { LayoutChangeEvent, Pressable, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useBottomSheet } from '@Context/BottomSheet';
import SheetOptions from '../SheetOptions';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const OptionButton: React.FC<{ expandButton: SharedValue<number> }> = ({
  expandButton,
}) => {
  const colors = useColors();
  const textWidth = useSharedValue(0);
  const { showBottomSheet } = useBottomSheet();
  const buttonStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: colors.secondaryBackground,
      bottom: BOTTOM_BAR_HEIGHT + 22,
      shadowColor: colors.background,
    }),
    [BOTTOM_BAR_HEIGHT, colors]
  );

  const animatedWidthStyle = useAnimatedStyle(
    () =>
      textWidth.value
        ? {
            width: interpolate(
              expandButton.value,
              [0, 1],
              [0, textWidth.value + 8]
            ),
          }
        : {},
    []
  );
  const onTextLoaded = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }: LayoutChangeEvent) =>
      textWidth.value === 0 ? (textWidth.value = width) : null,
    [expandButton]
  );
  return (
    <AnimatedPressable
      style={[buttonStyle, styles.button]}
      onPress={() => {
        showBottomSheet({
          title: 'Options',
          icon: 'keypad-outline',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque purus neque,',
          body() {
            return <SheetOptions />;
          },
        });
      }}>
      <MaskedView
        maskElement={<Icon style={styles.icon} name={'keypad-outline'} />}>
        <LinearGradient
          style={styles.icon}
          colors={[colors.pink, colors.cyan]}
        />
      </MaskedView>
      <Text
        onLayout={onTextLoaded}
        style={[animatedWidthStyle]}
        textAlign="right"
        weight="bold">
        OPTIONS
      </Text>
    </AnimatedPressable>
  );
};

export default OptionButton;
